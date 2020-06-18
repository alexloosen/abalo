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

Route::get('articles','ArticleAPIController@get_count');
Route::get('articlespage/{offset}', 'ArticleAPIController@get_all_page');
Route::get('articles/{search}/{offset}', 'ArticleAPIController@searchArticlePage');
Route::get('articles/{search}', 'ArticleAPIController@searchArticle');
<<<<<<< HEAD
Route::get('getLastSearchTerms', 'ArticleAPIController@getLastSearchTerms');
=======
//m5 ->
Route::get('creator/articles/{id}','ArticleAPIController@personal_articles');
Route::post('/articles/{id}/sold','MessageAPIController@sold');
Route::post('/articles/discount/{id}','MessageAPIController@discount');
// <- m5
>>>>>>> 36de0a485cf7c0ba8ce2110393f0b90fe22a031b
Route::post('/articles','ArticleAPIController@create_api');
Route::delete('/articles/{id}','ArticleAPIController@delete_api');

Route::get('/newsite', 'ArticleNewsiteController@get_all_count');
