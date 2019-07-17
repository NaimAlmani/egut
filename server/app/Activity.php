<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = [
        'name', 'description', 'logoPath', 'is_active'
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
        return $this->belongsToMany('App\Contact', 'activities_contacts');
    }

    // members
    public function members()
    {

        return $this->belongsToMany('App\Member', 'activities_members')
            ->withPivot('is_active')
            ->withTimestamps();
    }
    //images
    public function images()
    {
        return $this->hasMany('App\ActivityImage', 'activity_id');
    }
    public function Times()
    {
        return $this->hasMany('App\ActivityTime', 'activity_id');
    }
}
