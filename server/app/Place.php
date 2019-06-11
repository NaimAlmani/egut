<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
       //
         protected $fillable = [
        'name', 'discription',
    ];

    public function activityTimes()
    {
         return $this->hasMany('App\ActivityTime');
    }
}
