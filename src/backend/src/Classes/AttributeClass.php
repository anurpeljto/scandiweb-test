<?php

namespace App\Classes;

class AttributeClass {
    private $id;
    private $value;
    private $displayValue;
    private $name;
    private $type;
    private $attribute_set_id;

    public function __construct($id, $value, $displayValue, $name, $type, $attribute_set_id){
        $this->id = $id;
        $this->value = $value;
        $this->displayValue = $displayValue;
        $this->name = $name;
        $this->type = $type;
        $this->attribute_set_id = $attribute_set_id;
    }

    public function getId(){
        return $this->id;
    }

    public function getValue(){
        return $this->value;
    }

    public function getDisplayValue(){
        return $this->displayValue;
    }

    public function attributesData(){
        return [
            'id' => $this->id,
            'value' => $this->value,
            'displayValue' => $this->displayValue,
            'name' => $this->name,
            'type' => $this->type,
            'attribute_set_id' => $this->attribute_set_id
        ];
    }
}

?>