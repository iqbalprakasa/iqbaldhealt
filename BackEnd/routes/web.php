<?php

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
// Route::group(['prefix' => 'service','middleware' => 'auth.token'], function () {
Route::group([ 'prefix' => 'service'], function () {
    Route::post('isian', 'PemilikController@isian');
    Route::get('edit', 'PemilikController@index');
    Route::get('muncul', 'PemilikController@index');
    Route::get('hapus', 'PemilikController@index');
    Route::post('login', 'LoginController@loginUser');
    Route::get('getmaster', 'ApotikController@getmaster');
    Route::get('gettransaksi', 'ApotikController@gettransaksi');
    Route::post('posttransaksi', 'ApotikController@inserttransaksi');
    
    // Route::get('getsigna', 'ApotikController@geotsigna');
});
