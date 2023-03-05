<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\PedidoControler;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/category/store', [CategoryController::class, 'store']);
Route::get('/category/all', [CategoryController::class, 'all']);
Route::delete('/category/delete/{id}', [CategoryController::class, 'delete']);
Route::get('/category/edit/{id}', [CategoryController::class, 'edit']);
Route::post('/category/update/{id}', [CategoryController::class, 'update']);

Route::post('product/store', [ProductController::class, 'store']);
Route::get('product/all', [ProductController::class, 'all']);
Route::get('product/edit/{id}', [ProductController::class, 'description']);

Route::post('product/update/{id}', [ProductController::class, 'update']);
Route::delete('product/delete/{id}', [ProductController::class, 'delete']);


Route::post('product/add-cart/{id}', [CartController::class, 'add']);
Route::get('product/cart/count', [CartController::class, 'count']);
Route::get('product/cart/viewcart', [CartController::class, 'viewcart']);
Route::put('product/cart/update/{cart_id}/{scope}', [CartController::class,'update']);

Route::delete('product/cart/delete/{cart_id}', [CartController::class, 'delete']);

Route::post('pedido', [PedidoControler::class, 'Finalizar']);
Route::get('historiquepedido', [PedidoControler::class, 'showpedido']);
Route::get('detailspedido/{id}', [PedidoControler::class, 'details']);



Route::post('user/register', [UserController::class, 'register']);
Route::post('user/login', [UserController::class, 'login']);
Route::get('user/adresse', [CartController::class, 'getusera']);

Route::middleware(['auth:sanctum'])->group(function(){
    Route::post('user/logout',[UserController::class,'logout']);

});


// client
Route::post('client/store/{action}/{id}', [ClientController::class, 'store']);
Route::get('client/all', [ClientController::class, 'all']);
Route::get('client/edit/{id}', [ClientController::class, 'edit']);
Route::delete('client/delete/{id}', [ClientController::class, 'delete']);









