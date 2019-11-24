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

Route::post('member/participate', 'API\membersController@participate');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('login', 'API\UserController@login');
Route::get('login', ['as' => 'login', 'uses' => 'API\OrgController@redirected']);


Route::get('orgs', 'API\OrgController@index');
Route::get('organization/organizationbyid', 'API\orgController@organizationbyid');

Route::get('category/categorybyid', 'API\CategoryController@categorybyid');
Route::get('group/groupbyid', 'API\GroupController@groupbyid');

Route::get('day/activities', 'API\DayController@daysactivities');


Route::get('place/placebyid', 'API\PlaceController@placebyid');

Route::get('activeactivities', 'API\activityController@activeactivities');
Route::post('activity/activitybyid', 'API\activityController@activitybyid');

//email
Route::post('email/income', 'API\emailsController@create');

// add subscription
Route::post('subscription/create', 'API\subscriptionsController@create');

//inbound email fetch emails from mailgun
Route::post('email/inbound', 'API\emailsController@inbound');



Route::get('categories', 'API\CategoryController@index');


Route::get('home', 'API\HomeController@index');


//get all days
Route::get('activity/alldays', 'API\activityController@alldays');

Route::get('places', 'API\PlaceController@index');
//slides routes
Route::get('slides', 'API\SlideController@index');


Route::post('email/sendtomembers', 'API\emailsController@sendtomembers');
//participate

// weekly activities
Route::get('email/weekly', 'API\emailsController@weekly');
Route::get('email/unsubscribe/{id}', 'API\emailsController@unsubscribe');







//auth routes for admin
Route::group(['middleware' => ['auth:api', 'cors']], function () {
    Route::post('register', 'API\UserController@register');
    Route::post('details', 'API\UserController@details');

    //organization
    Route::post('org/create', 'API\OrgController@create');
    Route::post('org/update', 'API\OrgController@update');
    Route::post('org/delete', 'API\OrgController@delete');
    Route::post('org/changemainorg', 'API\OrgController@changemainorg');

    //Place
    Route::post('place/create', 'API\PlaceController@create');
    Route::post('place/update', 'API\PlaceController@update');
    Route::post('place/delete', 'API\PlaceController@delete');
    Route::post('place/changebackgound', 'API\PlaceController@changebackgound');
    //groups
    Route::get('groups', 'API\GroupController@index');
    Route::post('group/create', 'API\GroupController@create');
    Route::post('group/update', 'API\GroupController@update');
    Route::post('group/delete', 'API\GroupController@delete');

    //category

    Route::post('category/create', 'API\CategoryController@create');
    Route::post('category/update', 'API\CategoryController@update');
    Route::post('category/delete', 'API\CategoryController@delete');

    //activities
    Route::get('activities', 'API\activityController@index');
    Route::post('activity/create', 'API\activityController@create');
    Route::post('activity/update', 'API\activityController@update');
    Route::post('activity/delete', 'API\activityController@delete');
    //activity orgs
    Route::post('activity/addorgs', 'API\activityController@addorgs');
    Route::post('activity/deleteorg', 'API\activityController@deleteorg');
    //activity groups
    Route::post('activity/addgroups', 'API\activityController@addgroups');
    Route::post('activity/deletegroup', 'API\activityController@deletegroup');

    //activity categories
    Route::post('activity/addcategories', 'API\activityController@addcategories');
    Route::post('activity/deletecategory', 'API\activityController@deletecategory');

    //activity places
    Route::post('activity/addplaces', 'API\activityController@addplaces');
    Route::post('activity/deleteplace', 'API\activityController@deleteplace');

    //add time to activity
    Route::post('activity/addtime', 'API\activityController@addtime');
    Route::post('activity/deletetime', 'API\activityController@deletetime');




    //activity images
    Route::post('activity/addimage', 'API\activityController@addimage');
    Route::post('activity/deleteimage', 'API\activityController@deleteimage');

    //activity contact
    Route::post('activity/addcontact', 'API\activityController@addcontact');
    Route::post('activity/deletecontact', 'API\activityController@deletecontact');
    Route::get('activity/allcontacts', 'API\activityController@allcontacts');
    Route::post('activity/addexistcontacts', 'API\activityController@addexistcontacts');
    Route::post('activity/activatemember', 'API\activityController@activatemember');
    Route::post('activity/activateactivity', 'API\activityController@activateactivity');
    Route::post('activity/deletemember', 'API\activityController@deletemember');

    /***********************organization*************** */
    //organization images
    Route::post('organization/addimage', 'API\OrgController@addimage');
    Route::post('organization/deleteimage', 'API\OrgController@deleteimage');
    Route::post('organization/changebackgound', 'API\OrgController@changebackgound');


    /************************* EMAILS *************** */

    Route::get('email/allemails', 'API\emailsController@allemails');
    Route::post('email/markasread', 'API\emailsController@markasread');
    Route::post('email/send', 'API\emailsController@send');


    Route::post('slide/create', 'API\SlideController@create');
    Route::post('slide/update', 'API\SlideController@update');
    Route::post('slide/delete', 'API\SlideController@delete');

    Route::get('subscriptions/', 'API\subscriptionsController@index');
    Route::post('subscription/delete', 'API\subscriptionsController@delete');
});
