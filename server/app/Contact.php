<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    //
    protected $fillable=['name','email','tel','image'];

    public function activities()
    {
         return $this->belongsToMany('App\Activity','activities_contacts');
    }
}
