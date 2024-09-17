<?php

namespace App\Database;

require 'dbconfig.php';
require_once __DIR__ . '/../Types/ProductType.php';
require_once __DIR__ . '/../Types/CategoryType.php';
require_once __DIR__ . '/../Types/AttributeType.php';
require_once __DIR__ . '/../Types/PriceType.php';
require_once __DIR__ . '/../Types/GalleryType.php';

class Database {
    private $conn;

    public function __construct(){
        $this->conn = new \mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT);
        // echo ('connected');
        if ($this->conn->connect_error) {
            die('Connection failed: ' . $this->conn->connect_error);
        }
    }

    public function getAllProducts(){
        $query = 'SELECT * FROM products';
        $result = $this->conn->query($query);

        
        $products = [];
        while ($row = $result->fetch_assoc()) {

            $product = new \App\Classes\ProductClass(
                $row['id'],
                $row['name'],
                $row['inStock'],
                $row['description'],
                $row['category_id'],
                $this->getAttributesForProduct($row['id']),
                $this->getGalleryForProduct($row['id']),
                $this->getPricesForProduct($row['id']),
                $row['brand']             
            );
            $products[] = $product;
        }
        // print_r($products[0]->getId());
        return $products;
    }

    public function getProductsByCategoryId($category_id){
        $query = 'SELECT * FROM products WHERE category_id = ?';
        $stmt = $this->conn->prepare($query);
        if(!$stmt){
            die('Error getting products by category: ' . $this->conn->error);
        }
        $stmt->bind_param('i', $category_id);
        $stmt->execute();
        $result = $stmt->get_result();

        $products = [];
        while($row = $result->fetch_assoc()){
            $product = new \App\Classes\ProductClass(
                $row['id'],
                $row['name'],
                $row['inStock'],
                $row['description'],
                $row['category_id'],
                $this->getAttributesForProduct($row['id']),
                $this->getGalleryForProduct($row['id']),
                $this->getPricesForProduct($row['id']),
                $row['brand']
            );
            $products[] = $product;
        }
        $stmt->close();
        return $products;
    }

    public function getAllCategories(){
        $result = $this->conn->query('SELECT * FROM categories');
        $categories = [];
        while($row = $result->fetch_assoc()){
            $categories[] = new \App\Classes\Category(
                $row['name']
            );
        }
        return $categories;
    }

    public function getAttributesForProduct($product_id){
        $query = "
        SELECT a.id, a.attribute_set_id, a.value, a.displayValue, s.name, s.type
        FROM attributes a
        INNER JOIN attribute_sets s ON a.attribute_set_id = s.id
        WHERE s.product_id = ?";
        
        $stmt= $this->conn->prepare($query);
        if(!$stmt){
            die('Error getting attributes for product: ' . $this->conn->error);
        }

        $stmt->bind_param('s', $product_id);
        $stmt->execute();
        $result = $stmt->get_result();

        $attributes = [];

        while($row = $result->fetch_assoc()){
            $attributes[] = new \App\Classes\AttributeClass(
                $row['id'],
                $row['attribute_set_id'],
                $row['value'],
                $row['displayValue'],
                $row['name'],
                $row['type']
            );
        }
        
        $stmt->close();
        return $attributes;
    }

    public function getPricesForProduct($productId) {
        $query = "SELECT * FROM prices WHERE product_id = ?";
        $stmt = $this->conn->prepare($query);
        if(!$stmt){
            die('Error getting prices for product: ' . $this->conn->error);
        }
        $stmt->bind_param('s', $productId);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();

        $price = new \App\Classes\PriceClass(
            $row['amount'],
            $row['currency_label'],
            $row['currency_symbol'],
            $row['id'],
            $row['product_id']
        );
        // print_r($product_id);
        $stmt->close();

        return $price;
    }

    public function getProductById($product_id) {
        $result = $this->conn->query('SELECT * FROM products WHERE id = ' . $product_id);
        $product = $result->fetch_assoc();
        return new \App\Classes\ProductClass(
            $product['id'],
            $product['name'],
            $product['inStock'],
            $this->getGalleryForProduct($product['id']),
            $product['description'],
            $product['category'],
            $this->getAttributesForProduct($product['id']),
            $this->getPricesForProduct($product->getId()),
            $product['brand']
        );
    }

    public function getGalleryForProduct($productId) {
        $query = "SELECT * FROM galleries WHERE product_id = ?";
        $stmt = $this->conn->prepare($query);
        if(!$stmt){
            die('Error getting gallery for product: ' . $this->conn->error);
        }
        $stmt->bind_param('s', $productId);
        $stmt->execute();
        $result = $stmt->get_result();

        $gallery = [];
        while($row = $result->fetch_assoc()){
            $gallery[] = $row['url'];
        }
        $stmt->close();
        return $gallery;
    }

    public function getActiveCategory(){
        $result = $this->conn->query('SELECT * FROM categories WHERE active = 1');
        $category = $result->fetch_assoc();
        $categoryClass = new \App\Classes\CategoryClass(
            $category['name'],
            $category['id']);
        
        return $categoryClass->getCategoryDetails();
    }

    public function setActiveCategory($category_id){
        $this->conn->query('SET SQL_SAFE_UPDATES = 0');

        $unsetAll = 'UPDATE categories SET active = 0';
        $unsetStmt = $this->conn->prepare($unsetAll);
        $unsetStmt->execute();
        $unsetStmt->close();

        $setActive = 'UPDATE categories SET active = 1 WHERE name = ?';
        $stmtActive = $this->conn->prepare($setActive);
        $stmtActive->bind_param('s', $category_id);
        $stmtActive->execute();
        $stmtActive->close();
    }

    public function createOrder($items, $totalAmount){
        $this->conn->begin_transaction();

        try {
            $orderQuery = 'INSERT INTO orders (total_amount) VALUES (?)';
            $stmt = $this->conn->prepare($orderQuery);
            $stmt->bind_param('d', $totalAmount);
            $stmt->execute();

            $orderId = $stmt->insert_id;
            $stmt->close();

            forEach($items as $item){
                $itemQuery = 'INSERT INTO order_items (order_id, product_id, name, item_count, price_amount, price_symbol) VALUES (?, ?, ?, ?, ?, ?)';
                $stmt = $this->conn->prepare($itemQuery);
                $stmt->bind_param('issids', $orderId, $item['id'], $item['name'], $item['itemCount'], $item['price_amount'], $item['price_symbol']);
                $stmt->execute();
                $orderItemId = $stmt->insert_id;
                $stmt->close();

                // here we insert order item attributes (into separate table, linked via foreign key)
                foreach($item['attributes'] as $attribute) {
                    $attributeQuery = 'INSERT INTO order_item_attributes (order_item_id, name, type) VALUES (?, ?, ?)';
                    $stmt = $this->conn->prepare($attributeQuery);
                    $stmt->bind_param('iss', $orderItemId, $attribute['name'], $attribute['type']);
                    $stmt->execute();
                    $stmt->close();
                }

                // now we must insert order item gallery (also into separate table with a foreign key)
                forEach($item['gallery'] as $galleryItem){
                    $galleryQuery = 'INSERT INTO order_item_galleries (order_item_id, url) VALUES (?, ?)';
                    $stmt = $this->conn->prepare($galleryQuery);
                    $stmt->bind_param('is', $orderItemId, $galleryItem);
                    $stmt->execute();
                    $stmt->close();
                }
            }

            $this->conn->commit();
            return ['success' => true, 'order_id' => $orderId];
        } catch (\Exception $e) {
            $this->conn->rollback();
            return ['success' => false, 'error' => $e->getMessage()];

        }
    }

    public function close() {
        $this->conn->close();
    }
}