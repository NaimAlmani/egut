<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ActivityTime extends Model
{
    //

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
