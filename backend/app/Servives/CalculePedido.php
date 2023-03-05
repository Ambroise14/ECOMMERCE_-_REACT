<?php

namespace App\Servives;

use App\Models\Cart;
use App\Models\Endereco;
use App\Models\Itempedido;
use App\Models\Pedido;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class CalculePedido
{
 
  public static function getTotal(){
    $total = 0;
    if (auth('sanctum')->check()) {
      $user_id = auth('sanctum')->user()->id;
      $cart = Cart::where('user_id', $user_id)->get();
      foreach($cart as $p){
        $total += $p->price * $p->quantity;
      }
      return $total;
    }

  }

  public static function getCart(){
    if (auth('sanctum')->check()) {
      $user_id = auth('sanctum')->user()->id;
      $cart = Cart::where('user_id', $user_id)->get();
      return $cart;
    }
  }

  public static function DestroyCart(){
    if (auth('sanctum')->check()) {
      $user_id = auth('sanctum')->user()->id;
      $cart = Cart::where('user_id', $user_id)->delete();
      return true;
    }

   
  }
  public static function getAdresse(){
    if (auth('sanctum')->check()) {
      $user_id = auth('sanctum')->user()->id;
      $resultat=Endereco::join('users','enderecos.user_id','=','users.id')
      ->where('users.id',$user_id)
       ->get(['enderecos.*','users.*']);

      return $resultat;
    } 
  }

  public static function getOrder(){
    if (auth('sanctum')->check()) {
      $user_id = auth('sanctum')->user()->id;
      $resultat=Pedido::orderBy('id','DESC')->where('user_id',$user_id)->limit(1)->get();
      return $resultat;
    } 
  }

  public static function detailspedido($id){
    if (auth('sanctum')->check()) {
      $user_id = auth('sanctum')->user()->id;
      $resultat=Itempedido::orderBy('id','DESC')->where('pedido_id',$id)->get();
      return $resultat;
    } 
  }
  
}
