<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $table = "carts";
    protected $filleble = ['user_id', 'product_id','price','quantity'];

  protected $with = ['product'];
    public function product(){
    return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
