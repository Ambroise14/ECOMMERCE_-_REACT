<?php

namespace App\Servives;

use App\Models\Cart;
use App\Models\Itempedido;
use App\Models\Pedido;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PedidoService
{
  public static function Pedido(){
    if(auth('sanctum')->check()){
      $user_id = auth('sanctum')->user()->id;
      try{
        DB::beginTransaction();
        $date=Date('Y-m-d:H:i');
        $pedido = new Pedido;
        $pedido->datapedido = $date;
        $pedido->user_id = $user_id;
        $pedido->ref="PEN".rand(1111,99999);
        $pedido->total = CalculePedido::getTotal();
        $pedido->save();
        foreach(CalculePedido::getCart() as $p){
          $itempedido = new Itempedido();
          $itempedido->product_id=$p->product_id;
          $itempedido->quantity=$p->quantity;
          $itempedido->price=$p->price;
          $itempedido->datepedido=Date('Y-m-d:H:i');
          $itempedido->pedido_id = $pedido->id;
          $itempedido->save();
        }
        DB::commit();
        CalculePedido::DestroyCart();
      }catch(Exception $e){
        Log::error('error',['fille'=>'VenteService.Vente','message'=>$e->getMessage()]);
        DB::rollBack();
      }
    }else{
      return response()->json(['status' => 400]);
    }
  }

  public static function Pedido2(){
    if(auth('sanctum')->check()){
      $user_id = auth('sanctum')->user()->id;
      try{
        DB::beginTransaction();
        $date=Date('Y-m-d:H:i');
        $pedido = new Pedido;
        $pedido->datapedido = $date;
        $pedido->user_id = $user_id;
        $pedido->ref="PEN".rand(1111,99999);
        $pedido->total = CalculePedido::getTotal();
        $pedido->save();
        $itempedido = [];
        foreach(CalculePedido::getCart() as $p){
          $itempedido[] = [
            'product_id' => $p->product_id,
            'quantity' => $p->quantity,
            'price' => $p->price,
            'datepedido' => Date('Y-m-d:H:i'),
            'pedido_id' => $p->pedido_id,

          ];       
        }
        $pedido->orderitems()->createMany($itempedido);

        DB::commit();
        CalculePedido::DestroyCart();
      }catch(Exception $e){
        Log::error('error',['fille'=>'VenteService.Vente','message'=>$e->getMessage()]);
        DB::rollBack();
      }
    }else{
      return response()->json(['status' => 400]);
    }
  }

  
}
