<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Day extends Model
{
    //
    public function activityTimes()
    {
         return $this->belongsToMany('App\ActivityTimes');
    }
}
