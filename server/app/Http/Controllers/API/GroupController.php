<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Group;
use Validator;


class GroupController extends Controller

{
    //
    public function index(Request $request)
    {
        $groups = Group::orderBy('created_at' , 'desc')->get();
        return $groups->toJson();
    }

       public function redirected(Request $request)
    {
        return response()->json('unAuthorized');
    }
    /**
     * create new organization
     */
    public function create(Request $request){
          $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
    $group = Group::create(['name' => $request->name ,'description'=> $request->description]);
    $group->save();
    return $group->toJson();
    }
     /**
     * update organization
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
        //pring the row
        $group  = Group::find($request->id);
        //assign new values to the model
        $group->name  = $name;
        $group->description  = $description;
        $group->save();
    return $group->toJson();
    }
     /**
     * delete organization
     */
    public function delete(Request $request){
        $group = Group::find($request->id);
        if($group->activities->count()<=0){
             $group->delete();
              return $group->toJson();
        }else{
           return response()->json(['error'=>'You can not delete this Item it has related activities'], 401);
        }


    }
}
