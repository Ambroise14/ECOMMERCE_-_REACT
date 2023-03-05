<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = "products";
    protected $filleble = ['ref', 'name', 'description','price','status','popular','image','category_id','quantity'];
}
