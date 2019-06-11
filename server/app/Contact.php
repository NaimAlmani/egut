<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    //
    public function activities()
    {
         return $this->belongsToMany('App\Activity');
    }
}
