<?php

namespace App\Types;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class OrderItemAttributeInputType extends BaseType {
    public function __construct() {
        $this->name = 'OrderItemAttributeInput';
        $this->fields = [
            'name' => ['type' => Type::nonNull(Type::string())],
            'type' => ['type' => Type::nonNull(Type::string())],
        ];
    }
}
