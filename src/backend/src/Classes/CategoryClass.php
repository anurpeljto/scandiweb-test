<?php

namespace App\Classes;

class CategoryClass {
    private $name;
    private $id;

    public function __construct($name, $id){
        $this->name = $name;
        $this->id = $id;
    }

    public function getName() {
        return $this->name;
    }

    public function getCategoryDetails(){
        return [
            'name' => $this->name,
            'id' => $this->id
        ];
    }
}