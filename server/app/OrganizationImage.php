<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrganizationImage extends Model
{
    //
    protected $fillable = [
        'organization_id', 'path', 'title', 'description', 'width', 'height'
    ];

    public function organization()
    {
        return $this->belongsTo('App\Organization');
    }
    //specify table
    protected $table = 'organization_images';
}
