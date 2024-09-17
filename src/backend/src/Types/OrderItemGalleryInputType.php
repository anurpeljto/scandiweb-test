<?php

namespace App\Types;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class OrderItemGalleryInputType extends BaseType {
    public function __construct() {
        $this->name = 'OrderItemGalleryInput';
        $this->fields = [
            'url' => ['type' => Type::nonNull(Type::string())],
        ];
    }
}
