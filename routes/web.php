<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/start', function(){
    return view('werbeseite');
})->name('start');
Route::get('/2-6-ajax', function(){
    return view('2-6-ajax');
});

Route::get('/login', 'AuthController@login')->name('login');
Route::get('/logout', 'AuthController@logout')->name('logout');
Route::get('/isloggedin', 'AuthController@isloggedin')->name('haslogin');

Route::get('/articles','ArticlesController@all_articles')->name('articles');
Route::get('/articles{qstr}','ArticlesController@filter_articles')->name('filter_articles');

Route::get('/sell','ArticlesController@sell')->name('sell');
Route::post('/articles', 'ArticlesController@create')->name('create_article');

Route::get('/newsite',function(){
    return view('newsite');
});
