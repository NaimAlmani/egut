<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
       protected $fillable = [
        'name', 'description', 'logoPath','is_active'
    ];
    //organizations
 public function organizations()
    {
         return $this->belongsToMany('App\Organization');
    }
    //target groups
 public function groups()
    {
         return $this->belongsToMany('App\Group');
    }
    //categories
    public function categories()
    {
         return $this->belongsToMany('App\Category');
    }
     //places
    public function places()
    {
         return $this->belongsToMany('App\Place');
    }
    // contacts
 public function contacts()
    {
         return $this->belongsToMany('App\Contact');
    }
    //images
  public function images()
    {
         return $this->belongsToMany('App\ActivityImage');
    }
 public function Times()
    {
         return $this->belongsToMany('App\ActivityTime');
    }
}
