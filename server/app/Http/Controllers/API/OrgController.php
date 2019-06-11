<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Organization;
use Validator;


class OrgController extends Controller

{
    //
    public function index(Request $request)
    {
        $orgs = Organization::orderBy('created_at' , 'desc')->get();
        return $orgs->toJson();
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
    $org = Organization::create(['name' => $request->name ,'description'=> $request->description,'logoPath'=>$imgName  ]);
    $org->save();
    return $org->toJson();
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
        $image = $request->logo;
        //pring the row
        $org  = Organization::find($request->id);
        //assign new values to the model
        $org->name  = $name;
        $org->description  = $description;
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
                $org->logoPath = $imgName;
         }
        //saving to db
        $org->save();
    return $org->toJson();
    }
     /**
     * delete organization
     */
    public function delete(Request $request){
        $org = Organization::find($request->id);
        if($org->activities->count()<=0){
             $org->delete();
              return $org->toJson();
        }else{
           return response()->json(['error'=>'You can not delete this Item it has related activities'], 401);
        }


    }
}
