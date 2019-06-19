<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Activity;
use App\Organization;
use App\Group;
use App\Category;
use App\Place;

use Validator;


class ActivityController extends Controller

{
    //
    public function index(Request $request)
    {
        $acts = Activity::with('groups','organizations')->orderBy('created_at' , 'desc')->get();
        return $acts->toJson();
    }

   /**
     * get activity by ID
     */
    public function activitybyid(Request $request){
        $act = Activity::find($request->id);
        $orgs = $act->organizations()->get();
        $groups = $act->groups()->get();
        return response()->json(['activity'=>$act ,'organizations'=>$orgs,'groups'=>$groups]);
    }


       public function redirected(Request $request)
    {
        return response()->json('unAuthorized');
    }
    /**
     * create new activity
     */
    public function create(Request $request){
          $validator = Validator::make($request->all(), [
            'name' => 'required',
            'logo' => 'required|image',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
         $image = $request->logo;
        //saving image
             $imgName  = md5(time().uniqid()).'.'.
                $image->getClientOriginalExtension();
                $image->storeAs('/public/images/',$imgName);
        //save to db
    $activity = Activity::create(['name' => $request->name ,'description'=> $request->description,'logoPath'=>$imgName,'is_active'=>$request->is_active  ]);
    $activity->save();
    return $activity->toJson();
    }
     /**
     * update activity
     */
    public function update(Request $request){
        //validate
          $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        //validate image
        //assign vars
        $id = $request->id;
        $name = $request->name;
        $description = $request->description;
        $is_active = $request->is_active;
        $image = $request->logo;
        //pring the row
        $activity  = Activity::find($request->id);
        //assign new values to the model
        $activity->name  = $name;
        $activity->description  = $description;
        $activity->is_active = $is_active;
         if(isset($image) && $image!="null" && $image!=null){
               $logoValidator = Validator::make($request->all(), [
            'logo' => 'image',
        ]);
        if ($logoValidator->fails()) {
            return response()->json(['error'=>$logoValidator->errors()], 401);
        }
               $imgName  = md5(time().uniqid()).'.'.
                $image->getClientOriginalExtension();
                $image->storeAs('/public/images/',$imgName);
                $activity->logoPath = $imgName;
         }
        //saving to db
        $activity->save();
    return $activity->toJson();
    }
     /**
     * delete activity
     */
    public function delete(Request $request){
        $act = Activity::find($request->id);
             $act->delete();
              return $act->toJson();
    }



   /*********************************** Activity orgs *********************************************/
    public function addorgs(Request  $request){
        // validate inputs

        $activity = $request['activity'];
        $orgs = $request['orgs'];
        $act  = Activity::find($activity['id']);
        //check activity is exist
        if($act->count()<0){
            return response()->json(['error'=>"activity is not valid"],401);
        }else{
            foreach($orgs as $organization)
            {
                //get the org data
                $org = Organization::find($organization['id']);
                //check org is exist
                if($org->count<0){
                     return response()->json(['error'=>$organization." , organization is not valid"],401);
                }
                //check if relation is exist
                if($act->organizations()->find($org->id)){
                     return response()->json(['error'=>$org->name." , is exist "],401);
                }
                //add org to activity
                $act->organizations()->attach($org->id);
            }
            //return requested  orgs
            return response()->json($orgs);
        }
    }

    /**
     * add orgs to activity
     * @param
     * {
     *  activity:{ id  , name , logoPath},
     * orgs:[org]
     *
     * }
     */
    public function deleteorg(Request  $request){
        // validate inputs
        $activity = $request['activity'];
        $org = $request['org'];
        $act  = Activity::find($activity);
        //check activity is exist
                $act->organizations()->detach($org);
                 return response()->json(true);
    }
    /**************************************End Activity orgs ***************************************/


    /*********************************** Activity groups *********************************************/
    public function addgroups(Request  $request){
        // validate inputs
        $activity = $request['activity'];
        $groups = $request['groups'];
        $act  = Activity::find($activity['id']);
        //check activity is exist
        if($act->count()<0){
            return response()->json(['error'=>"activity is not valid"],401);
        }else{
            foreach($groups as $group)
            {
                //get the gr data
                $gr = Group::find($group['id']);
                //check gr is exist
                if($gr->count<0){
                     return response()->json(['error'=>$group." , group is not valid"],401);
                }
                //check if relation is exist
                if($act->groups()->find($gr->id)){
                     return response()->json(['error'=>$gr->name." , is exist "],401);
                }
                //add gr to activity
                $act->groups()->attach($gr->id);
            }
            //return requested  groups
            return response()->json($groups);
        }
    }

    public function deletegroup(Request  $request){
        // validate inputs
        $activity = $request['activity'];
        $group = $request['group'];
        $act  = Activity::find($activity);
        //check activity is exist
                $act->groups()->detach($group);
                 return response()->json(true);
    }
    /**************************************End Activity groups ***************************************/


       /*********************************** Activity categories *********************************************/
    public function addcategories(Request  $request){
        // validate inputs
        $activity = $request['activity'];
        $categories = $request['categories'];
        $act  = Activity::find($activity['id']);
        //check activity is exist
        if($act->count()<0){
            return response()->json(['error'=>"activity is not valid"],401);
        }else{
            foreach($categories as $category)
            {
                //get the gr data
                $cat = Category::find($category['id']);
                //check cat is exist
                if($cat->count<0){
                     return response()->json(['error'=>$category." , category is not valid"],401);
                }
                //check if relation is exist
                if($act->categories()->find($cat->id)){
                     return response()->json(['error'=>$cat->name." , is exist "],401);
                }
                //add cat to activity
                $act->categories()->attach($cat->id);
            }
            //return requested  catoups
            return response()->json($categories);
        }
    }

    public function deletecategory(Request  $request){
        // validate inputs
        $activity = $request['activity'];
        $category = $request['category'];
        $act  = Activity::find($activity);
        //check activity is exist
                $act->categories()->detach($category);
                 return response()->json(true);
    }
    /**************************************End Activity categories ***************************************/


     /*********************************** Activity places *********************************************/
    public function addplaces(Request  $request){
        // validate inputs
        $activity = $request['activity'];
        $places = $request['places'];
        $act  = Activity::find($activity['id']);
        //check activity is exist
        if($act->count()<0){
            return response()->json(['error'=>"activity is not valid"],401);
        }else{
            foreach($places as $place)
            {
                //get the gr data
                $gr = Place::find($place['id']);
                //check gr is exist
                if($gr->count<0){
                     return response()->json(['error'=>$place." , place is not valid"],401);
                }
                //check if relation is exist
                if($act->places()->find($gr->id)){
                     return response()->json(['error'=>$gr->name." , is exist "],401);
                }
                //add gr to activity
                $act->places()->attach($gr->id);
            }
            //return requested  places
            return response()->json($places);
        }
    }

    public function deleteplace(Request  $request){
        // validate inputs
        $activity = $request['activity'];
        $place = $request['place'];
        $act  = Activity::find($activity);
        //check activity is exist
                $act->places()->detach($place);
                 return response()->json(true);
    }
    /**************************************End Activity places ***************************************/

}
