<?php

namespace App\Types;
use App\Types\BaseType;

use GraphQL\Type\Definition\Type;

class CategoryType extends BaseType {
    public function __construct() {
        $this->name = 'Category';
        $this->fields = [
            'name' => Type::nonNull(Type::string()),
            'id' => Type::nonNull(Type::int())
        ];
    }
}
