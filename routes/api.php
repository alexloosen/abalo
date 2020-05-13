<?php

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/articles','ArticleAPIController@create_api');
Route::delete('/articles/{id}','ArticleAPIController@delete_api');

Route::get('/shoppingcart','ArticleAPIController@make_cart');
Route::post('/shoppingcart/{articleid}','ArticleAPIController@add_to_cart');
Route::delete('/shoppingcart/{shoppingcartid}/articles/{articleid}', 'ArticleAPIController@remove_from_cart');
