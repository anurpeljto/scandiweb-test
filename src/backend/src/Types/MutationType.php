<?php
namespace App\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\Types\BaseType;
use App\Types\ProductType;
use App\Types\AttributeType;
use App\Types\PriceType;
use App\Types\GalleryType;
use App\Types\OrderType;
use App\Types\OrderItemInputType;

class MutationType  extends BaseType{
    protected $db;
    protected $name;
    protected $fields;

    public function __construct($db) {
        $this->db = $db;
        $this->name = 'Mutation';
        $this->fields = [
            'setActiveCategory' => [
                        'type' => Type::boolean(),
                        'args' => ['category_name' => ['type' => Type::string()]],
                        'resolve' => function($root, $args) use ($db) {
                            return $db->getCategoryRepository()->setActiveCategory($args['category_name']);
                        }
                    ],
            'createOrder' => [
                'type' => (new OrderType($db))->getType(),
                'args' => [
                    'items' => ['type' => Type::listOf((new OrderItemInputType())->getInput())],
                    'total_amount' => ['type' => Type::nonNull(Type::float())],
                ],
                'resolve' => function($root, $args) use ($db) {
                    $response = $db->getOrderRepository()->createOrder($args['items'], $args['total_amount']);
                    if ($response['success']) {
                        return [
                            'total_amount' => $args['total_amount'],
                            'order_id' => $response['order_id'],
                        ];
                    } else {
                        throw new \Exception($response['error']);
                    }
                }
            ]
        ];
    }

}