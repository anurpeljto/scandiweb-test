<?php

namespace App\Types;


use GraphQL\Type\Definition\Type;
use App\Types\BaseType;

class ProductType extends BaseType {
    protected $db;

    public function __construct($db) {
        $this->name = 'Product';
        $this->fields = [
            'id' => Type::string(),
            'name' => Type::string(),
            'inStock' => Type::boolean(),
            'description' => Type::string(),
            'category_id' => Type::int(),
            'attributes' => [
                'type' => Type::listOf((new AttributeType())->getType()),
                'resolve' => function($product) use ($db) {
                    $attributes = $db->getAttributeRepository()->getAttributesForProduct($product['id']);
                    $attributesData = [];
                    foreach ($attributes as $attribute) {
                        $attributesData[] = $attribute->attributesData();
                    }
                    return $attributesData;
                }
            ],
            'gallery' => [
                'type' => Type::listOf(Type::string()),
                'resolve' => function($product) use ($db) {
                    return $db->getGalleryRepository()->getGalleryForProduct($product['id']); 
                }
            ],
            'price' => [
                'type' => (new PriceType())->getType(),
                'resolve' => function($product) use ($db) {
                    $response = $db->getPriceRepository()->getPricesForProduct($product['id']);   
                    return $response->priceData();
                }
            ],
            'brand' => ['type' => Type::string()],
        ];
    }
}
