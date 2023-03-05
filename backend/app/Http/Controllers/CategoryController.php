<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function store(Request $request){
        $validator = Validator::make($request->all(), ['ref' => 'required', 'name' => 'required', 'image' => 'required']);
        if($validator->fails()){
            return response()->json([
                'status'=>400,
                'errors'=>$validator->getMessageBag()
            ]);
        }else{
            $category = new Category();
            $category->ref = $request->ref;
            $category->name = $request->name;
            if($request->hasFile('image')){
                $image = $request->file('image');
                $image_name = $image->getClientOriginalName();
                $category->image = $image_name;
                $image->move('images/category', $image_name);
            }
            $category->save();
            return response()->json([
                'status'=>200,
                'message'=>'added successfully'
            ]);
        }
     
    }
    public function all(Request $request){
        $category = Category::orderBy('id', 'DESC')->get();
        return response()->json([
            'status' => 200,
            'cate' => $category
        ]);
    }

    public function delete(Request $request,$id){
        $category = Category::find($id);
        $category->delete();
        return response()->json([
            'status' => 200,
            'message' => 'deleing successfully'
        ]);
    }


    public function edit(Request $request,$id){
        $category = Category::find($id);
        return response()->json([
            'status' => 200,
            'category' =>$category
        ]);
    }

    public function update(Request $request,$id){
      
     
    }
}
