<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function store(Request $request){
        $validator = Validator::make($request->all(), 
            [
            'ref' => 'required', 
            'name' => 'required', 'description' => 'required',
            'price' => 'required' ,
          'quantity'=>'required',
            'category_id' => 'required',
            'image' => 'required'
            
             ]);
                                                   
        if($validator->fails()){
            return response()->json([
                'status'=>400,
                'errors'=>$validator->getMessageBag()
            ]);

        }else{
            try{
                $product = new Product();
                $product->category_id = $request->category_id;
                $product->ref = $request->ref;
                $product->name = $request->name;
                $product->description = $request->description;
                $product->price=$request->price;
              $product->quantity = $request->quantity;

                $product->status = $request->status == TRUE ? '1' : '0';
                $product->popular =$request->popular == TRUE ? '1' : '0';
                if($request->hasFile('image')){
                    $image = $request->file('image');
                    $image_name = $image->getClientOriginalName();
                    $product->image = $image_name;
                    $image->move('images/product', $image_name);
                }
                $product->save();


                if($request->hasFile('files')){
                  foreach($request->file('files') as $key=> $files){
                      $file_name=time().$key.$files->getClientOriginalName();
                      $files->move('images/product',$file_name);
                      $album=new Album();
                      $album->product_id=$product->id;
                      $album->images=$file_name;
                      $album->save();
                  }
              }
                return response()->json([
                    'status'=>200,
                    'message'=>'Added success'
                ]);
            }catch(Exception $e){
                Log::error('elizane', ['solution' => $e->getMessage()]);
            };
          
        }
    }
    public function all(Request $request){
        $product = Product::orderBy('id', 'DESC')->limit(9)->get();
        $status1 = Product::orderBy('id', 'DESC')->where('popular','1')->get();

        return response()->json([
            'status'=>200,
            'prod'=>$product,
            'status1'=>$status1
        ]);
    }
    public function description(Request $request,$id){
      $product=Product::find($id);
      $category_id = $product->category_id;
    $identique = Product::where('category_id', $category_id)->get();   
      return response()->json([
        'status'=>200,
        'prod'=>$product,
        'cat'=> $identique
    ]);
    }
    public function update(Request $request,$id){
      $validator = Validator::make($request->all(), 
          [
          'ref' => 'required', 
          'name' => 'required', 'description' => 'required',
          'price' => 'required' ,
          'quantity'=>'required',
          'category_id' => 'required',
          'image' => 'required'
          
           ]);
                                                 
      if($validator->fails()){
          return response()->json([
              'status'=>400,
              'errors'=>$validator->getMessageBag()
          ]);

      }else{
          try{
              $product =Product::find($id);
              $product->category_id = $request->category_id;
              $product->ref = $request->ref;
              $product->name = $request->name;
              $product->quantity = $request->quantity;

              $product->description = $request->description;
              $product->price=$request->price;
              $product->status = $request->status == TRUE ? '1' : '0';
              $product->popular =$request->popular == TRUE ? '1' : '0';
              if($request->hasFile('image')){
                  $image = $request->file('image');
                  $image_name = $image->getClientOriginalName();
                  $product->image = $image_name;
                  $image->move('images/product', $image_name);
              }
              $product->update();
              return response()->json([
                  'status'=>200,
                  'message'=>'Added success'
              ]);
          }catch(Exception $e){
              Log::error('elizane', ['solution' => $e->getMessage()]);
          };
        
      }
  }
  public function delete(Request $request,$id){
    $category = Product::find($id);
    $category->delete();
    return response()->json([
        'status' => 200,
        'message' => 'deleing successfully'
    ]);
}
  
}
