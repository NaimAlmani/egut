<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ActivityTime extends Model
{
    //
    protected $fillable = [
        'activity_id', 'place_id','day_id','start_time','end_time','date','is_weekly'
    ];

public function activity()
    {
         return $this->belongsTo('App\Activity');
    }
public function day()
    {
         return $this->belongsTo('App\Day');
    }
public function place()
    {
         return $this->belongsTo('App\Place');
    }
    //specify Table
      protected $table = 'activities_times';
}
