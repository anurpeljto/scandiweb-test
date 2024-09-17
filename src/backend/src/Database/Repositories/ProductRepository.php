<?php

namespace App\Repositories;

use App\Database\DatabaseConnection;
use App\Classes\ProductClass;

class ProductRepository {
    private $db;

    public function __construct(DatabaseConnection $db) {
        $this->db = $db->getConnection();
    }

    public function getAllProducts() {
        $query = 'SELECT * FROM products';
        $result = $this->db->query($query);
        $products = [];

        while ($row = $result->fetch_assoc()) {
            $products[] = new ProductClass(
                $row['id'],
                $row['name'],
                $row['inStock'],
                $row['description'],
                $row['category_id'],
                (new AttributeRepository(new DatabaseConnection))->getAttributesForProduct($row['id']),
                (new GalleryRepository(new DatabaseConnection))->getGalleryForProduct($row['id']),
                (new PriceRepository(new DatabaseConnection))->getPricesForProduct($row['id']),
                $row['brand']
            );
        }

        return $products;
    }

    public function getProductsByCategoryId($category_id) {
        $query = 'SELECT * FROM products WHERE category_id = ?';
        $stmt = $this->db->prepare($query);
        if(!$stmt){
            die('Error getting products by category: ' . $this->db->error);
        }
        $stmt->bind_param('i', $category_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $products = [];

        while($row = $result->fetch_assoc()){
            $products[] = new ProductClass(
                $row['id'],
                $row['name'],
                $row['inStock'],
                $row['description'],
                $row['category_id'],
                (new AttributeRepository(new DatabaseConnection))->getAttributesForProduct($row['id']),
                (new GalleryRepository(new DatabaseConnection))->getGalleryForProduct($row['id']),
                (new PriceRepository(new DatabaseConnection))->getPricesForProduct($row['id']),
                $row['brand']
            );
        }
        $stmt->close();
        return $products;
    }

    public function getProductById($product_id) {
        $query = 'SELECT * FROM products WHERE id = ?';
        $stmt = $this->db->prepare($query);
        if(!$stmt){
            die('Error getting product by ID: ' . $this->db->error);
        }
        $stmt->bind_param('i', $product_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $product = $result->fetch_assoc();
        $stmt->close();

        return new ProductClass(
            $product['id'],
            $product['name'],
            $product['inStock'],
            $product['description'],
            $product['category_id'],
            (new AttributeRepository(new DatabaseConnection))->getAttributesForProduct($product['id']),
            (new GalleryRepository(new DatabaseConnection))->getGalleryForProduct($product['id']),
            (new PriceRepository(new DatabaseConnection))->getPricesForProduct($product['id']),
            $product['brand']
        );
    }
}
