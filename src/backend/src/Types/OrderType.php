<?php

namespace App\Types;


use GraphQL\Type\Definition\Type;
use App\Types\BaseType;

class OrderType extends BaseType {
    protected $db;

    public function __construct($db) {
        $this->name = 'Order';
        $this->fields = [
            'order_id' => ['type' => Type::id()],
            'total_amount' => ['type' => Type::nonNull(Type::float())],
        ];
    }
}