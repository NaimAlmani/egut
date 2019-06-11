<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Activity;
use App\Organization;
use Validator;


class ActivityController extends Controller

{
    //
    public function index(Request $request)
    {
        $acts = Activity::orderBy('created_at' , 'desc')->get();
        return $acts->toJson();
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
    /**
     * get activity by ID
     */
    public function activitybyid(Request $request){
        $act = Activity::find($request->id);
        $orgs = $act->organizations()->get();
        return response()->json(['activity'=>$act ,'organizations'=>$orgs]);
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
}
