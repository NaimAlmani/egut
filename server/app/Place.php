<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    //
    protected $fillable = [
        'name', 'discription', 'favorite', 'image'
    ];

    public function activities()
    {
        return $this->belongsToMany('App\Activity');
    }

    public function activityTimes()
    {
        return $this->hasMany('App\ActivityTime');
    }
}
