<?php

namespace App\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\Types\BaseType;

class QueryType extends BaseType {
    protected $db;

    public function __construct($db) {
        $this->db = $db;
        $this->name = 'Query';
        $this->fields = [
            'products' => [
                'type' => Type::listOf((new ProductType($db))->getType()),
                'resolve' => function() use ($db) {
                    $products = $db->getProductRepository()->getAllProducts();
                    $productsData = [];
                    foreach ($products as $product) {
                        $productsData[] = $product->getAllData();
                    }
                    return $productsData;
                    }
            ],
            'categories' => [
                'type' => Type::listOf((new CategoryType())->getType()),
                'resolve' => function() use ($db) {
                    return $db->getCategoryRepository()->getAllCategories();
                }
            ],
            'activeCategory' => [
                'type' => (new CategoryType())->getType(),
                'resolve' => function() use ($db) {
                    return $db->getCategoryRepository()->getActiveCategory();
                }
            ],
            'prices' => [
                'type' => Type::listOf((new PriceType())->getType()),
                'resolve' => function() use ($db) {
                    return $db->getPriceRepository()->getAllPrices();
                }
            ],
            'product' => [
                'type' => (new ProductType($db))->getType(),
                'args' => [
                    'id' => ['type' => Type::id()]
                ],
                'resolve' => function($root, $args) use ($db) {
                    return $db->getProductRepository()->getProductById($args['id']);
                }
            ],
            'productsByCategory' => [
                'type' => Type::listOf((new ProductType($db))->getType()),
                'args' => [
                    'category_id' => ['type' => Type::id()]
                ],
                'resolve' => function($root, $args) use ($db) {
                    $products = $db->getProductRepository()->getProductsByCategoryId($args['category_id']);
                    $productsData = [];
                    foreach ($products as $product) {
                        $productsData[] = $product->getAllData();
                    }
                    return $productsData;
                }
            ],
            'attributesForProduct' => [
                'type' => Type::listOf((new AttributeType())->getType()),
                'args' => [
                    'product_id' => ['type' => Type::string()]
                ],
                'resolve' => function($root, $args) use ($db) {
                    $response = $db->getAttributeRepository()->getAttributesForProduct($args['product_id']);

                    $attributes = [];
                    foreach ($response as $attribute) {
                        $attributes[] = $attribute->attributesData();
                    }
                    return $attributes;
                }
            ],
        ];
    }
}
