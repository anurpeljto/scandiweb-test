<?php

namespace App\Repositories;

use App\Database\DatabaseConnection;
use App\Classes\AttributeClass;

class AttributeRepository {
    private $db;

    public function __construct(DatabaseConnection $db) {
        $this->db = $db->getConnection();
    }

    public function getAttributesForProduct($product_id){
        $query = "
        SELECT a.id, a.attribute_set_id, a.value, a.displayValue, s.name, s.type
        FROM attributes a
        INNER JOIN attribute_sets s ON a.attribute_set_id = s.id
        WHERE s.product_id = ?";
        
        $stmt= $this->db->prepare($query);
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
}
