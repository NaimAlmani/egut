<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    //
       protected $fillable = [
        'name', 'description',
    ];

    public function activities()
    {
         return $this->belongsToMany('App\Activity');
    }

}
