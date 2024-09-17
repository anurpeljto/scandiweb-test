<?php

namespace App\Classes;

class PriceClass {
    private $amount;
    private $currency_label;
    private $currency_symbol;
    private $id;
    private $product_id;

    public function __construct($amount, $currency_label, $currency_symbol, $id, $product_id){
        $this->amount = $amount;
        $this->currency_label = $currency_label;
        $this->currency_symbol = $currency_symbol;
        $this->id = $id;
        $this->product_id = $product_id;
    }

    public function priceData() {
        return [
            'amount' => $this->amount,
            'currency_label' => $this->currency_label,
            'currency_symbol' => $this->currency_symbol,
            'id' => $this->id,
            'product_id' => $this->product_id
        ];
    }

}