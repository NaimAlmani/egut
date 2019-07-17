<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    //
    protected $fillable = ['name', 'email', 'tel', 'is_active'];

    public function activities()
    {
        return $this->belongsToMany('App\Activity', 'activities_members');
    }
}
