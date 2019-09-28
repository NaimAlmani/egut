<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Slide;
use Validator;
use Image;

class SlideController extends Controller
{
    //


    public function index(Request $request)
    {
        $places = Slide::orderBy('created_at', 'desc')->get();
        return $places->toJson();
    }

    public function redirected(Request $request)
    {
        return response()->json('unAuthorized');
    }



    /**
     * create new slide
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'image' => 'required'
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
            $originalPath = 'images/';

            //get current image sizes
            $width = Image::make($image)->width();
            $height = Image::make($image)->height();
            //save original image
            $originalImage =  Image::make($image)->save(public_path($originalPath . $imgName));
            //save small image
        }
        $slide = Slide::create(['title' => $request->title, 'subtitle' => $request->subtitle, 'image' => $imgName]);
        $slide->save();
        return $slide->toJson();
    }
    /**
     * update slide
     */
    public function update(Request $request)
    {
        //validate
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'image' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        //validate image
        //assign vars
        $id = $request->id;
        $title = $request->title;
        $subtitle = $request->subtitle;
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
            $originalImage =  Image::make($image)->save(public_path($originalPath . $imgName));
            //save small image
        }

        //pring the row
        $slide  = Slide::find($request->id);
        //assign new values to the model
        $slide->title  = $title;
        $slide->subtitle  = $subtitle;
        $slide->image = $imgName;
        //saving to db
        $slide->save();
        return $slide->toJson();
    }
    /**
     * delete slide
     */
    public function delete(Request $request)
    {
        $slide = Slide::find($request->id);
        $slide->delete();
        return $slide->toJson();
    }
}
