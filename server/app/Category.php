<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    //
       protected $fillable = [
        'name', 'description','icon_name','icon_font'
    ];

     public function activities()
    {
         return $this->belongsToMany('App\Activity');
    }
    protected $table = 'categories';
}
