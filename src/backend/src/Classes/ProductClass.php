<?php
namespace App\Classes;

class ProductClass {
    private $id;
    private $name;
    private $inStock;
    private $description;
    private $category_id;
    private $attributes;
    private $gallery;
    private $price;
    private $brand;

    public function __construct($id, $name, $inStock, $description, $category_id, $attributes, $gallery, $price, $brand) {
        $this->id = $id;
        $this->name = $name;
        $this->inStock = $inStock;
        $this->description = $description;
        $this->category_id = $category_id;
        $this->price = $price;
        $this->brand = $brand;
        $this->attributes = $attributes;
        $this->gallery = $gallery;
    }

    // getters

    public function getId() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public function getInStock(){
        return $this->inStock;
    }

    public function getGallery() {
        return $this->gallery;
    }

    public function getDescription() {
        return $this->description;
    }

    public function getCategory() {
        return $this->category;
    }

    public function getPrice() {
        return $this->price;
    }

    public function getBrand() {
        return $this->brand;
    }


    public function getAllData() {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'inStock' => $this->inStock,
            'description' => $this->description,
            'category_id' => $this->category_id,
            'price' => $this->price,
            'brand' => $this->brand,
            'attributes' => array_map(function($attribute) { return $attribute->attributesData(); }, $this->attributes),
            'gallery' => $this->gallery
        ];
    }

}