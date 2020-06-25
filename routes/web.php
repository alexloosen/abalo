<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Cache;

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

Route::get('/login', 'AuthController@login')->name('login');
Route::get('/logout', 'AuthController@logout')->name('logout');
Route::get('/isloggedin', 'AuthController@isloggedin')->name('haslogin');

Route::get('/newsite',function(){
    return view('newsite');
});

Route::get('/statistics', function(){
    $keys = Redis::keys('*');
    $pure_keys;
    for($i = 0; $i < sizeof($keys); $i++){
        if($keys[$i] != 'lastarticlesearch'){
            $pure_keys[$keys[$i]] = Cache::get($keys[$i]);
        }
    }

    return response()->json($pure_keys);
});
