<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
{

  public function store(Request $request,$action,$id)
  {
    $validator = Validator::make($request->all(), ['name'=>'required','firstName'=>'required','age'=>'required','image'=>'required']);
    if($validator->fails()){
      return response()->json(['status' => 400, 'errors' => $validator->getMessageBag()]);
    }
    if($action=="add"){
      $client = new Client();
      $client->name = $request->name;
      $client->firstName=$request->firstName;
      $client->age = $request->age;
      if($request->hasFile('image')){
        $image = $request->file('image');
        $image_name = $image->getClientOriginalName();
        $client->image = $image_name;
        $image->move('images/clients', $image_name);
    }
    $client->save();
    return response()->json(['status' => 200, 'message' =>'parabens']);
    }else if($action=="up"){
      $client = Client::find($id);
      $client->name = $request->name;
      $client->firstName=$request->firstName;
      $client->age = $request->age;
      if($request->hasFile('image')){
        $image = $request->file('image');
        $image_name = $image->getClientOriginalName();
        $client->image = $image_name;
        $image->move('images/clients', $image_name);
    }
    }
  
    $client->update();
    return response()->json(['status' => 200, 'message' =>'Update effectuee aaavec success']);

  }
   public function restoreAll()
    {
    Client::onlyTrashed()->restore();
    return response()->json(['status' => 200, 'message' => 'storing successfuly']);
    }

    public function all(){
    $c = Client::orderBy('id', 'DESC')->limit(8)->get();
    return response()->json(['status' => 200, 'clients' =>$c]);

    }

    public function edit(Request $request,$id){
    return response()->json(['status' => 200, 'client' =>Client::find($id)]);

    }

    public function delete(Request $request,$id){
      Client::where('id',$id)->delete();
      return response()->json(['status' => 200, 'messaage' =>'success']);
  
      }
}

