<?php

namespace App\Repositories;

use App\Database\DatabaseConnection;
use App\Classes\PriceClass;

class PriceRepository {
    private $db;

    public function __construct(DatabaseConnection $db) {
        $this->db = $db->getConnection();
    }

    public function getPricesForProduct($product_id) {
        $query = "SELECT * FROM prices WHERE product_id = ?";
        $stmt = $this->db->prepare($query);
        if(!$stmt){
            die('Error getting prices for product: ' . $this->db->error);
        }
        $stmt->bind_param('s', $product_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();

        $price = new PriceClass(
            $row['amount'],
            $row['currency_label'],
            $row['currency_symbol'],
            $row['id'],
            $row['product_id']
        );
        $stmt->close();

        return $price;
    }
}
