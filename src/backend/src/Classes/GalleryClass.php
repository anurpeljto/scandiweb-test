<?php
namespace App\Classes;

class GalleryClass {
    private $id;
    private $product_id;
    private $url;


    public function __construct($id, $product_id, $url){
        $this->id = $id;
        $this->product_id = $product_id;
        $this->url = $url;
    }   

    public function galleryData() {
        return[
            'id' => $this->id,
            'product_id' => $this->product_id,
            'url' => $this->url
        ];
    }  
}