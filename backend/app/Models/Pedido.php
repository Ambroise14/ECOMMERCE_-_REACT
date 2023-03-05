<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    protected $table = "pedidos";
    protected $filleble = ['datapedido', 'user_id','total','ref'];

    public function orderitems(){
      return $this->belongsTo(Itempedido::class,'pedido_id','id');
      }
}
