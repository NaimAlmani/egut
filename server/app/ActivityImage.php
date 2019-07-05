<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ActivityImage extends Model
{
      protected $fillable = [
        'activity_id', 'path','title','description','width','height'
    ];

    public function activity()
    {
         return $this->belongsTo('App\Activity');
    }
    //specify table
    protected $table = 'activities_images';
}
