<?php

namespace App\Database;
require 'dbconfig.php';

class DatabaseConnection {
    private $conn;

    public function __construct() {
        $this->conn = new \mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT);
        if ($this->conn->connect_error) {
            die('Connection failed: ' . $this->conn->connect_error);
        }
    }

    public function getConnection() {
        return $this->conn;
    }

    public function close() {
        $this->conn->close();
    }
}
