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

Route::get('articles','ArticleAPIController@get_all');
Route::get('articles/{search}', 'ArticleAPIController@searchArticle');
Route::post('/articles','ArticleAPIController@create_api');
Route::delete('/articles/{id}','ArticleAPIController@delete_api');

Route::get('/shoppingcart','CartAPIController@make_cart');
Route::post('/shoppingcart/{articleid}','CartAPIController@add_to_cart');
Route::delete('/shoppingcart/{shoppingcartid}/articles/{articleid}', 'CartAPIController@remove_from_cart');
