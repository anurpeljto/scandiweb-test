<?php

namespace App\Database;

use App\Repositories\ProductRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\AttributeRepository;
use App\Repositories\PriceRepository;
use App\Repositories\GalleryRepository;
use App\Repositories\OrderRepository;

class Databasee {
    private $dbConnection;

    public function __construct() {
        $this->dbConnection = new DatabaseConnection();
    }

    public function getProductRepository() {
        return new ProductRepository($this->dbConnection);
    }

    public function getCategoryRepository() {
        return new CategoryRepository($this->dbConnection);
    }

    public function getAttributeRepository() {
        return new AttributeRepository($this->dbConnection);
    }

    public function getPriceRepository() {
        return new PriceRepository($this->dbConnection);
    }

    public function getGalleryRepository() {
        return new GalleryRepository($this->dbConnection);
    }

    public function getOrderRepository() {
        return new OrderRepository($this->dbConnection);
    }
}
