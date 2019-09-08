<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Category;
use App\Group;
use App\Slide;

class HomeController extends Controller
{
    //

    public function index(Request $request)
    {
        $categories = Category::orderBy('created_at', 'desc')->get();
        $groups = Group::orderBy('created_at', 'desc')->get();
        $sliders = Slide::orderBy('created_at', 'desc')->get();
        return response()->json(
            [
                'categories' => $categories,
                'groups' => $groups,
                'slides' => $sliders,
            ]
        );
    }
}
