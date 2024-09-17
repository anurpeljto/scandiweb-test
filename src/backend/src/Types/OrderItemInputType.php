<?php

namespace App\Types;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class OrderItemInputType extends BaseType {
    public function __construct() {
        $this->name = 'OrderItemInput';
        $this->fields = [
            'id' => Type::string(),
            'name' =>Type::string(),
            'itemCount' => Type::int(),
            'price_amount' => Type::float(),
            'price_symbol' => Type::string(),
            'attributes' => ['type' => Type::listOf((new OrderItemAttributeInputType())->getInput())],
            'gallery' => ['type' => Type::listOf(Type::string())],
        ];
    }
}
