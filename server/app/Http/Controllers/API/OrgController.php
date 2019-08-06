<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Organization;
use Validator;
use Image;
use File;
use App\OrganizationImage;

class OrgController extends Controller

{
    //
    public function index(Request $request)
    {
        $orgs = Organization::orderBy('created_at', 'desc')->get();
        return $orgs->toJson();
    }

    public function redirected(Request $request)
    {
        return response()->json('unAuthorized');
    }
    /**
     * create new organization
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'logo' => 'required|image',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        //START SAVE IMAGE

        $imgName = "defaultOrgLogo.jpg";
        if ($request->logo->isValid()) {
            //save images
            $image = $request->logo;
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
        //END SAVE IMAGE

        //save to db
        $org = Organization::create([
            'name'          => $request->name,
            'description'   => $request->description,
            'logoPath'      => $imgName,
            'detail'        => $request->detail,
            'website'       => $request->website,
            'email'         => $request->email,
            'tel'           => $request->tel,
            'contact'       => $request->contact
        ]);
        $org->save();
        return $org->toJson();
    }
    /**
     * update organization
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
        $image = $request->logo;
        $detail = $request->detail;
        $website = $request->website;
        $email = $request->email;
        $tel = $request->tel;
        $contact = $request->contact;
        $background = $request->background;

        //pring the row
        $org  = Organization::find($request->id);
        //assign new values to the model
        $org->name  = $name;
        $org->description  = $description;
        $org->detail  = $detail;
        $org->website  = $website;
        $org->email  = $email;
        $org->tel  = $tel;
        $org->contact  = $contact;
        if ($request->logo->isValid()) {
            $logoValidator = Validator::make($request->all(), [
                'logo' => 'image',
            ]);
            if ($logoValidator->fails()) {
                return response()->json(['error' => $logoValidator->errors()], 401);
            }
            //save images
            $image = $request->logo;
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
            $org->logoPath = $imgName;
        }
        //saving to db
        $org->save();
        return $org->toJson();
    }
    /**
     * delete organization
     */
    public function delete(Request $request)
    {
        $org = Organization::find($request->id);
        if ($org->activities->count() <= 0) {
            $org->delete();
            return $org->toJson();
        } else {
            return response()->json(['error' => 'You can not delete this Item it has related activities'], 401);
        }
    }
    public function organizationbyid(Request $request)
    {
        $org = Organization::find($request->id);
        $images = $org->images()->get();
        $activities = $org->activities()->get();
        return response()->json(
            [
                'organization' => $org,
                'images' => $images,
                'activities' => $activities
            ]
        );
    }

    public function addimage(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'organization_id' => 'required',
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
        $img = OrganizationImage::create([
            'organization_id' => $request->organization_id,
            'title'             => $request->title,
            'description'       => $request->description,
            'path'              => $imgName,
            'width'            => $smallWidth,
            'height'           => $smallHeight
        ]);

        $img->save();
        return $img->toJson();
    }
    // delete Image
    public function deleteimage(Request $request)
    {
        $img = $request['id'];
        $removedImage = OrganizationImage::find($img);
        $removedImage->delete();
        return response()->json(true);
    }
    /***
     *  CHANGE BACKGROUND IMAGE
     */
    public function changebackgound(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'organization_id' => 'required',
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
        $org = Organization::find($request->organization_id);
        $org->background = $imgName;
        $org->save();
        return $org->toJson();
    }
}
