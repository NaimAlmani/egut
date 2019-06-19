<?php

namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Place;
use Validator;


class PlaceController extends Controller

{
    //
    public function index(Request $request)
    {
        $places = Place::orderBy('created_at' , 'desc')->get();
        return $places->toJson();
    }

       public function redirected(Request $request)
    {
        return response()->json('unAuthorized');
    }
    /**
     * create new place
     */
    public function create(Request $request){
          $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        //save image
        $image = $request->image;
        $imgName="default.jpg";
        if(!empty($image)){
        //saving image
             $imgName  = md5(time().uniqid()).'.'.
                $image->getClientOriginalExtension();
                $image->storeAs('/public/images/',$imgName);
        //save to db
        }
        $favorite=false;
        if($request->favorite==true){
            $favorite=true;
        }
    $place = Place::create(['name' => $request->name ,'description'=> $request->description,'favorite'=>$favorite,'image'=>$imgName]);
    $place->save();
    return $place->toJson();
    }
     /**
     * update place
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
        $favorite = $request->favorite;
         $image = $request->image;
        $imgName="default.jpg";
        if(!empty($image)){
        //saving image
             $imgName  = md5(time().uniqid()).'.'.
                $image->getClientOriginalExtension();
                $image->storeAs('/public/images/',$imgName);
        //save to db
        }
        //pring the row
        $place  = Place::find($request->id);
        //assign new values to the model
        $place->name  = $name;
        $place->description  = $description;
        $place->favorite  = $favorite;
        $place->image = $imgName;
        //saving to db
        $place->save();
    return $place->toJson();
    }
     /**
     * delete place
     */
    public function delete(Request $request){
        $place = Place::find($request->id);
        if($place->activityTimes->count()<=0){
             $place->delete();
              return $place->toJson();
        }else{
           return response()->json(['error'=>'You can not delete this Item it has related activities'], 401);
        }
    }
}
