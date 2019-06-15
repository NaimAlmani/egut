<?php

use Illuminate\Http\Request;

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
Route::post('login', 'API\UserController@login');
Route::get('login', ['as'=>'login','uses'=>'API\OrgController@redirected']);
Route::post('register', 'API\UserController@register');

//auth routes for admin
Route::group(['middleware' => ['auth:api','cors']], function(){
Route::post('details', 'API\UserController@details');

//organization
Route::get('orgs','API\OrgController@index');
Route::post('org/create','API\OrgController@create');
Route::post('org/update','API\OrgController@update');
Route::post('org/delete','API\OrgController@delete');

//Place
Route::get('places','API\PlaceController@index');
Route::post('place/create','API\PlaceController@create');
Route::post('place/update','API\PlaceController@update');
Route::post('place/delete','API\PlaceController@delete');

//groups
Route::get('groups','API\GroupController@index');
Route::post('group/create','API\GroupController@create');
Route::post('group/update','API\GroupController@update');
Route::post('group/delete','API\GroupController@delete');

//category
Route::get('categories','API\CategoryController@index');
Route::post('category/create','API\CategoryController@create');
Route::post('category/update','API\CategoryController@update');
Route::post('category/delete','API\CategoryController@delete');

//activities
Route::get('activities','API\activityController@index');
Route::post('activity/create','API\activityController@create');
Route::post('activity/update','API\activityController@update');
Route::post('activity/delete','API\activityController@delete');
Route::post('activity/activitybyid','API\activityController@activitybyid');
Route::post('activity/addorgs','API\activityController@addorgs');
Route::post('activity/deleteorg','API\activityController@deleteorg');
});

