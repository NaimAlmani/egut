<?php

namespace App\Http\Controllers\API;

use App\ActivityTime;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Day;
use App\Activity;

class DayController extends Controller
{
    //
    public function daysactivities(Request $request)
    {
        $allTimes = ActivityTime::orderBy('created_at')->with('place', 'activity')->get();
        //
        $resultTimes = [];
        foreach ($allTimes as $time) {
            if ($time->activity->is_active == 1 && $time->is_weekly == 1) {
                array_push($resultTimes, $time);
            }
        }
        $activities = Activity::orderBy('created_at')->with('organizations')->get();

        return response()->json(['times' => $resultTimes, 'activities' => $activities]);
    }
}
