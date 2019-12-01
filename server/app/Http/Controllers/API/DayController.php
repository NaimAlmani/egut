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
            $act= Activity::find($time->activity_id);
            if($act){
                if ($act->is_active == 1) {
                       if ($act->is_weekly==true){
                             array_push($resultTimes, $time);
                        }else if(Carbon::now()->between(Carbon::parse($item->start_date),Carbon::parse($item->end_date))) {
                            array_push($resultTimes, $time);
                        }       
               }
            }
        }
        $activities = Activity::orderBy('created_at')->with('organizations')->get();

        return response()->json(['times' => $resultTimes, 'activities' => $activities]);
    }
}
