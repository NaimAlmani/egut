<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    //
     protected $fillable = [
        'name', 'description', 'logoPath',
    ];
    public function activities()
    {
         return $this->belongsToMany('App\Activity');
    }
    protected $table = "organizations";
 }
