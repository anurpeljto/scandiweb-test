<?php

namespace App\Repositories;

use App\Database\DatabaseConnection;

class OrderRepository {
    private $db;

    public function __construct(DatabaseConnection $db) {
        $this->db = $db->getConnection();
    }

    public function createOrder($items, $totalAmount){
        $this->db->begin_transaction();

        try {
            $orderQuery = 'INSERT INTO orders (total_amount) VALUES (?)';
            $stmt = $this->db->prepare($orderQuery);
            $stmt->bind_param('d', $totalAmount);
            $stmt->execute();

            $orderId = $stmt->insert_id;
            $stmt->close();

            forEach($items as $item){
                $itemQuery = 'INSERT INTO order_items (order_id, product_id, name, item_count, price_amount, price_symbol) VALUES (?, ?, ?, ?, ?, ?)';
                $stmt = $this->db->prepare($itemQuery);
                $stmt->bind_param('issids', $orderId, $item['id'], $item['name'], $item['itemCount'], $item['price_amount'], $item['price_symbol']);
                $stmt->execute();
                $orderItemId = $stmt->insert_id;
                $stmt->close();

                // here we insert order item attributes (into separate table, linked via foreign key)
                foreach($item['attributes'] as $attribute) {
                    $attributeQuery = 'INSERT INTO order_item_attributes (order_item_id, name, type) VALUES (?, ?, ?)';
                    $stmt = $this->db->prepare($attributeQuery);
                    $stmt->bind_param('iss', $orderItemId, $attribute['name'], $attribute['type']);
                    $stmt->execute();
                    $stmt->close();
                }

                // now we must insert order item gallery (also into separate table with a foreign key)
                forEach($item['gallery'] as $galleryItem){
                    $galleryQuery = 'INSERT INTO order_item_galleries (order_item_id, url) VALUES (?, ?)';
                    $stmt = $this->db->prepare($galleryQuery);
                    $stmt->bind_param('is', $orderItemId, $galleryItem);
                    $stmt->execute();
                    $stmt->close();
                }
            }

            $this->db->commit();
            return ['success' => true, 'order_id' => $orderId];
        } catch (\Exception $e) {
            $this->db->rollback();
            return ['success' => false, 'error' => $e->getMessage()];

        }
    }
}
