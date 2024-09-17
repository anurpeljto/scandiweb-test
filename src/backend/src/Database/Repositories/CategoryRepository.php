<?php

namespace App\Repositories;

use App\Database\DatabaseConnection;
use App\Classes\CategoryClass;

class CategoryRepository {
    private $db;

    public function __construct(DatabaseConnection $db) {
        $this->db = $db->getConnection();
    }

    public function getAllCategories(){
        $result = $this->db->query('SELECT * FROM categories');
        $categories = [];
        while($row = $result->fetch_assoc()){
            $categories[] = new \App\Classes\Category(
                $row['name']
            );
        }
        return $categories;
    }

    public function getActiveCategory(){
        $result = $this->db->query('SELECT * FROM categories WHERE active = 1');
        $category = $result->fetch_assoc();
        $categoryClass = new \App\Classes\CategoryClass(
            $category['name'],
            $category['id']);
        
        return $categoryClass->getCategoryDetails();
    }

    public function setActiveCategory($category_id){
        $this->db->query('SET SQL_SAFE_UPDATES = 0');

        $unsetAll = 'UPDATE categories SET active = 0';
        $unsetStmt = $this->conn->prepare($unsetAll);
        $unsetStmt->execute();
        $unsetStmt->close();

        $setActive = 'UPDATE categories SET active = 1 WHERE name = ?';
        $stmtActive = $this->db->prepare($setActive);
        $stmtActive->bind_param('s', $category_id);
        $stmtActive->execute();
        $stmtActive->close();
    }
}
