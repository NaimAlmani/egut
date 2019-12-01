<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Category;
use Validator;


class CategoryController extends Controller

{
    //
    public function index(Request $request)
    {
        $categorys = Category::orderBy('created_at', 'desc')->get();
        return $categorys->toJson();
    }

    public function redirected(Request $request)
    {
        return response()->json('unAuthorized');
    }

    public function categorybyid(Request $request)
    {
        $cat = Category::find($request->id);
        $acts = $cat->activities()->get();
         $filteredItems  = $acts->filter(function($item) {
               if ($item->is_weekly==true){
                   return $item;
            }else if(Carbon::now()->between(Carbon::parse($item->start_date),Carbon::parse($item->end_date))) {
                  return $item;
             }       
        })->values();
        return response()->json(
            [
                'category' => $cat,
                'activities' => $filteredItems
            ]
        );
    }
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'icon_name' => 'required',
            'icon_font' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $category = Category::create([
            'name' => $request->name,
            'description' => $request->description,
            'icon_name' => $request->icon_name,
            'icon_font' => $request->icon_font
        ]);
        $category->save();
        return $category->toJson();
    }
    /**
     * update organization
     */
    public function update(Request $request)
    {
        //validate
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'icon_name' => 'required',
            'icon_font' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        //validate image
        //assign vars
        $id          = $request->id;
        $name        = $request->name;
        $description = $request->description;
        $icon_name   = $request->icon_name;
        $icon_font   = $request->icon_font;
        //pring the row
        $category  = Category::find($request->id);
        //assign new values to the model
        $category->name  = $name;
        $category->description = $description;
        $category->icon_name   = $icon_name;
        $category->icon_font   = $icon_font;
        $category->save();
        return $category->toJson();
    }
    /**
     * delete category
     */
    public function delete(Request $request)
    {
        $category = Category::find($request->id);
        if ($category->activities->count() <= 0) {
            $category->delete();
            return $category->toJson();
        } else {
            return response()->json(['error' => 'You can not delete this Item it has related activities'], 401);
        }
    }
}
