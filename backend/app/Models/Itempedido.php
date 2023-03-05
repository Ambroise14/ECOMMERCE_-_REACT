<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Itempedido extends Model
{
    protected $table = "itempedidos";
    protected $filleble =['pedido_id', 'product_id','quantity','price','datapedido'];


    protected $with = ['product'];
    public function product(){
    return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
