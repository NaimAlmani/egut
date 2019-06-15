<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    //
       protected $fillable = [
        'name', 'description','icon_name','icon_font'
    ];

    public function activities()
    {
         return $this->belongsToMany('App\Activity');
    }

}
