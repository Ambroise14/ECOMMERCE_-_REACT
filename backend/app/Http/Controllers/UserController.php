<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use App\Servives\CalculePedido;
use GuzzleHttp\Promise\Create;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function register(Request $request){
        $validator=Validator::make($request->all(),[
            'name'=>'required|max:191',
            'email'=>'required|email|max:191|unique:users,email',
            'password'=>'required|min:8'
        ]);
        if($validator->fails()){
            return response()->json([
                'status'=>400,
                'errors'=>$validator->getMessageBag()
            ]);
        }else{
            $user=User::create([
             'name'=>$request->name,
             'email'=>$request->email,
             'password'=>Hash::make($request->password)
            ]);
            //return $user->createToken('token-name', ['server:update'])->plainTextToken;
                $token=$user->createToken($user->email.'_Token')->plainTextToken;
                return response()->json([
                    'status'=>200,
                    'username'=>$user->email,
                    'user'=>$user,
                    'token'=>$token,
                    'message'=>'added user successfull'
                ]);
           
        }
    }
    public function login(Request $request){
        $validator=Validator::make($request->all(),[
            'email'=>'required',
            'password'=>'required'
        ]);
        if($validator->fails()){
            return response()->json([
                'status'=>400,
                'errors'=>$validator->getMessageBag()
            ]);
        }else{
            $credentials=['email'=>$request->email,'password'=>$request->password];
            if(Auth::attempt($credentials)){
                $user=Auth::user();
                $token=$user->createToken($user->email.'_token')->plainTextToken;
                $add = new CalculePedido();
                   $response = $add::getAdresse();
                return response()->json([
                    'status'=>200,
                    'username'=>$user->email,
                    'user'=>$response,
                    'token'=>$token,
                    'message'=>'Loged succssfully'

                ]); 
            }else{
                return response()->json([
                    'status'=>401,
                    'message'=>'Credential invalido'
                ]);
            }
        }
         
        }
       
    
    public function all(){
        $cat=User::orderBy('id','DESC')->limit(50)->get();
        return response()->json([
            'status'=>200,
            'users'=>$cat
        ]);
    }

    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
            'status'=>200, 
        ]); 
    }

    public function delete($id){
        if(User::where('id',$id)->delete()){
            return response()->json([
                'status'=>200, 
                'message'=>'deleting'
            ]); 
        }else{
            return response()->json([
                'status'=>401, 
                'message'=>'error deleting'

            ]);   
        }
    }
    public function edit($id){
        $user=User::find($id);
        return response()->json([
            'status'=>200, 
            'user'=>$user

        ]);   
    }
}
