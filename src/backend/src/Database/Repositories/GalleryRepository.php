<?php

namespace App\Repositories;

use App\Database\DatabaseConnection;

class GalleryRepository {
    private $db;

    public function __construct(DatabaseConnection $db) {
        $this->db = $db->getConnection();
    }

    public function getGalleryForProduct($product_id) {
        $query = "SELECT * FROM galleries WHERE product_id = ?";
        $stmt = $this->db->prepare($query);
        if(!$stmt){
            die('Error getting gallery for product: ' . $this->db->error);
        }
        $stmt->bind_param('s', $product_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $gallery = [];

        while($row = $result->fetch_assoc()){
            $gallery[] = $row['url'];
        }
        $stmt->close();
        return $gallery;
    }
}
