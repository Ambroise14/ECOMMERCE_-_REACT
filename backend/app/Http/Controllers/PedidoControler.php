<?php

namespace App\Http\Controllers;

use App\Models\Endereco;
use App\Servives\CalculePedido;
use App\Servives\PedidoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use SebastianBergmann\Complexity\Calculator;

class PedidoControler extends Controller
{
    public function Finalizar(Request $request){
    $validator = Validator::make($request->all(), 
    [
      'nome' => 'required', 
      'cidade'=>'required',
      'cep'=>'required',
      'numero'=>'required',


    ]);
    if($validator->fails()){
      return response()->json([
        'status' => 400,
        'errors' => $validator->getMessageBag()
      ]);
    }
    $verification = Endereco::where('user_id', auth('sanctum')->user()->id)->first();
    if($verification){
      $verification->cep=$request->cep;
      $verification->bairro=$request->bairro;
      $verification->cidade=$request->cidade;
      $verification->logradoura=$request->logradouro;
      $verification->estado=$request->estado;
      $verification->numero=$request->numero;
      $verification->complement=$request->complemento;
      $verification->user_id=auth('sanctum')->user()->id;
      $verification->update();
    }else{
      $adress = new Endereco();
      $adress->cep=$request->cep;
      $adress->bairro=$request->bairro;
      $adress->cidade=$request->cidade;
      $adress->logradoura=$request->logradouro;
      $adress->estado = $request->estado;
      $adress->numero=$request->numero;
      $adress->complement=$request->complement;
      $adress->user_id = auth('sanctum')->user()->id;
      $adress->save();
    }
   
    $pedido = new PedidoService();
    $pedido::Pedido();
    if($pedido){
      return response()->json([
        'status' => 200,
        'message' => 'Pedido foi concluido com successo'
      ]);
    }
    }

    public function showpedido(){
    $pedido = CalculePedido::getOrder();
    return response()->json([
      'status' =>200,
      'ped' =>$pedido
    ]);
    }

    public function details($id){
    $detail = CalculePedido::detailspedido($id);
    return response()->json([
      'status' =>200,
      'ped' =>$detail 
    ]);
    }
}
