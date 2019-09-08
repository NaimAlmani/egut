<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Place;
use Validator;
use Image;

class PlaceController extends Controller

{

    //
    public function index(Request $request)
    {
        $places = Place::orderBy('created_at', 'desc')->get();
        return $places->toJson();
    }

    public function redirected(Request $request)
    {
        return response()->json('unAuthorized');
    }



    /**
     * create new place
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $imgName = "default.jpg";
        if (!is_null($request->image) && $request->image != 'null') {
            //save images
            $image = $request->image;
            //deal with images
            //set the image name
            $imgName = md5(time() . uniqid()) . '.' .
                $image->getClientOriginalExtension();
            //set th images path
            $smallPath = 'images/small/';
            $originalPath = 'images/';

            //get current image sizes
            $width = Image::make($image)->width();
            $height = Image::make($image)->height();
            //save original image
            $originalImage =  Image::make($image)->resize($width, $height)->save(public_path($originalPath . $imgName));
            //save small image
            $smallWidth = $width;
            $smallHeight = $height;
            switch (true) {
                case $width <= 300:
                    $smallWidth = $width / 2;
                    $smallHeight = $height / 2;
                    break;
                case $width >= 1000:
                    $smallWidth = $width / 4;
                    $smallHeight = $height / 4;
                default:
                    $smallWidth = $width / 3;
                    $smallHeight = $height / 3;
            }
            $smallImage =  Image::make($image)->resize($smallWidth, $smallHeight)->save(public_path($smallPath . $imgName));
        }
        $favorite = false;
        if ($request->favorite == 1) {
            $favorite = true;
        }
        $place = Place::create(['name' => $request->name, 'description' => $request->description, 'favorite' => $favorite, 'image' => $imgName]);
        $place->save();
        return $place->toJson();
    }
    /**
     * update place
     */
    public function update(Request $request)
    {
        //validate
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        //validate image
        //assign vars
        $id = $request->id;
        $name = $request->name;
        $description = $request->description;
        $image = $request->image;
        $imgName = "default.jpg";
        if (!is_null($request->image) && $request->image != 'null') {
            //save images
            $image = $request->image;
            //deal with images
            //set the image name
            $imgName = md5(time() . uniqid()) . '.' .
                $image->getClientOriginalExtension();
            //set th images path
            $smallPath = 'images/small/';
            $originalPath = 'images/';

            //get current image sizes
            $width = Image::make($image)->width();
            $height = Image::make($image)->height();
            //save original image
            $originalImage =  Image::make($image)->resize($width, $height)->save(public_path($originalPath . $imgName));
            //save small image
            $smallWidth = $width;
            $smallHeight = $height;
            switch (true) {
                case $width <= 300:
                    $smallWidth = $width / 2;
                    $smallHeight = $height / 2;
                    break;
                case $width >= 1000:
                    $smallWidth = $width / 4;
                    $smallHeight = $height / 4;
                default:
                    $smallWidth = $width / 3;
                    $smallHeight = $height / 3;
            }
            $smallImage =  Image::make($image)->resize($smallWidth, $smallHeight)->save(public_path($smallPath . $imgName));
        }
        $favorite = false;
        if ($request->favorite == 1) {
            $favorite = true;
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
    public function delete(Request $request)
    {
        $place = Place::find($request->id);
        if ($place->activityTimes->count() <= 0) {
            $place->delete();
            return $place->toJson();
        } else {
            return response()->json(['error' => 'You can not delete this Item it has related activities'], 401);
        }
    }
    public function placebyid(Request $request)
    {
        $org = Place::find($request->id);
        $activities = $org->activities()->get();
        return response()->json(
            [
                'place' => $org,
                'activities' => $activities
            ]
        );
    }
    /***
     *  CHANGE BACKGROUND IMAGE
     */
    public function changebackgound(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'place_id' => 'required',
            'path' => 'required|image',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        //save images
        $image = $request->path;
        //deal with images
        //set the image name
        $imgName = md5(time() . uniqid()) . '.' .
            $image->getClientOriginalExtension();
        //set th images path
        $smallPath = 'images/small/';
        $originalPath = 'images/';

        //get current image sizes
        $width = Image::make($image)->width();
        $height = Image::make($image)->height();
        //save original image
        $originalImage =  Image::make($image)->resize($width, $height)->save(public_path($originalPath . $imgName));
        //save small image
        $smallWidth = $width;
        $smallHeight = $height;
        switch (true) {
            case $width <= 300:
                $smallWidth = $width / 2;
                $smallHeight = $height / 2;
                break;
            case $width >= 1000:
                $smallWidth = $width / 4;
                $smallHeight = $height / 4;
            default:
                $smallWidth = $width / 3;
                $smallHeight = $height / 3;
        }
        $smallImage =  Image::make($image)->resize($smallWidth, $smallHeight)->save(public_path($smallPath . $imgName));
        //save to db
        $org = Place::find($request->organization_id);
        $org->image = $imgName;
        $org->save();
        return $org->toJson();
    }
}
