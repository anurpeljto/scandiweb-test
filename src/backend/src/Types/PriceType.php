<?php

namespace App\Types;
use App\Types\BaseType;

use GraphQL\Type\Definition\Type;

class PriceType extends BaseType {
    public function __construct() {
        $this->name = 'Price';
        $this->fields = [
            'amount' => ['type' => Type::float()],
            'currency_label' => ['type' => Type::string()],
            'currency_symbol' => ['type' => Type::string()],
            'id' => ['type' => Type::id()],
            'product_id' => ['type' => Type::id()],
        ];
    }
}
