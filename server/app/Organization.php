<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    //
    protected $fillable = [
        'name', 'description', 'logoPath', 'detail', 'website', 'email', 'tel', 'contact', 'background', 'is_main'
    ];
    public function activities()
    {
        return $this->belongsToMany('App\Activity');
    }
    public function images()
    {
        return $this->hasMany('App\OrganizationImage');
    }
    protected $table = "organizations";
}
