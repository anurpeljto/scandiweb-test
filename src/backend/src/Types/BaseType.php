<?php

namespace App\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

abstract class BaseType {
    protected $name;
    protected $fields;

    public function getType() {
        return new ObjectType([
            'name' => $this->name,
            'fields' => $this->fields
        ]);
    }

    public function getInput(){
        return new InputObjectType([
            'name' => $this->name,
            'fields' => $this->fields
        ]);
    }
}
