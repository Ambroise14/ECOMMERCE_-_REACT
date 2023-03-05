<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Endereco;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
  public function add(Request $request,$id){
    if(auth('sanctum')->check()){
   $user_id=auth('sanctum')->user()->id;
    //$product_id=$request->product_id;
    //$product_quantity=$request->product_quantity;
    $product=Product::where('id',$id)->first();
    if($product){
        if(Cart::where('product_id',$id)->where('user_id',$user_id)->exists()){
            return response()->json(['status'=>409,'message'=>$product->name.'. '.'Areway added in cart']);
        }else{
            $cart=new Cart();
            $cart->user_id=$user_id;
            $cart->product_id=$id;
            $cart->quantity=$request->product_quantity==TRUE ? $request->product_quantity :1;
            $cart->price=$product->price;
            $cart->save();
            return response()->json(['status'=>200,'message'=>'Added to cart successfully']);
        }
     
    }else{
    return response()->json(['status'=>400,'message'=>'Product not Fund']);

    }
    }else{
        return response()->json(['status'=>401,'message'=>'Logged']);

    }
}

public function count(Request $request){
  if(auth('sanctum')->check()){
      $user_id=auth('sanctum')->user()->id;
      $count = Cart::where('user_id', $user_id)->count();
      return response()->json(['status'=>200,'compter'=>$count]);
  }else{
    return response()->json(['status'=>200,'compter'=>0]);

  }
}

public function viewcart(Request $request){
    $total = 0;
  if(auth('sanctum')->check()){
      $user_id=auth('sanctum')->user()->id;
      $count = Cart::where('user_id', $user_id)->get();
      foreach($count as $item){
        $total += $item->price * $item->quantity;
      }
      return response()->json(
        ['status'=>200,
        'cart'=>$count,
        'total'=>$total,
       
        ]);
  }else{
    return response()->json(['status'=>400]);

  }
}
public function update(Request $request,$cart_id,$cope){
    if (auth('sanctum')->check()) {
      $user_id=auth('sanctum')->user()->id;
      $cart = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();
      if ($cope == "inc") {
        $cart->quantity += 1;
      } else if ($cope == "dec") {
        $cart->quantity -= 1;
      }
      $cart->update();
      return response()->json(['status'=>200]);
    }
}
public function delete(Request $request,$cart_id){
    $total = 0;
  if(auth('sanctum')->check()){
      $user_id=auth('sanctum')->user()->id;
      $cart = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();
      $count = Cart::where('user_id', $user_id)->get();
      foreach($count as $item){
        $total += $item->price * $item->quantity;
      }
      $cart->delete();
    return response()->json(['status'=>200,'message'=>'removed successfully','total'=>$total]);
  } 
}

public function getusera(){
  if(auth('sanctum')->check()){
    $adress = Endereco::where('user_id', auth('sanctum')->user()->id)->first();
    return response()->json(['status'=>200,
      'nome'=>auth('sanctum')->user()->name,
      'bairro'=>$adress->bairro ,
      'cidade'=>$adress->cidade,
      'estado'=>$adress->estado,
      'logradoura'=>$adress->logradoura,
      'complement'=>$adress->complement,
      'numero'=>$adress->numero,
      'cep'=>$adress->cep,
    ]);
  }
}

}
