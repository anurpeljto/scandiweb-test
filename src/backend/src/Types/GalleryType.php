<?php

namespace App\Types;
use App\Types\BaseType;

use GraphQL\Type\Definition\Type;

class GalleryType extends BaseType {
    public function __construct() {
        $this->name = 'Gallery';
        $this->fields = [
            'id' => ['type' => Type::id()],
            'product_id' => ['type' => Type::id()],
            'url' => ['type' => Type::string()],
        ];
    }
}
