<?php

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
//to go to the react root
Route::view('/{path?}', 'app');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
