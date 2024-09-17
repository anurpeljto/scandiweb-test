<?php

namespace App\Types;
use App\Types\BaseType;

use GraphQL\Type\Definition\Type;

class AttributeSetType extends BaseType {
    public function __construct() {
        $this->name = 'AttributeSet';
        $this->fields = [
            'id' => ['type' => Type::id()],
            'product_id' => ['type' => Type::id()],
            'name' => ['type' => Type::string()],
            'type' => ['type' => Type::string()],
        ];
    }
}
