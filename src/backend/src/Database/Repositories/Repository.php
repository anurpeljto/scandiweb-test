<?php

namespace App\Repository;

abstract class Repository {
    protected $conn;

    public function __construct(DatabaseConnection $dbConnection) {
        $this->conn = $dbConnection->getConnection();
    }
}