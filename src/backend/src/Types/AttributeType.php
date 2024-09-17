<?php

namespace App\Types;
use App\Types\BaseType;

use GraphQL\Type\Definition\Type;

class AttributeType extends BaseType {
    public function __construct() {
        $this->name = 'Attribute';
        $this->fields = [
            'id' => ['type' => Type::id()],
            'attribute_set_id' => ['type' => Type::id()],
            'value' => ['type' => Type::string()],
            'displayValue' => ['type' => Type::string()],
            'name' => ['type' => Type::string()],
            'type' => ['type' => Type::string()],
        ];
    }
}
