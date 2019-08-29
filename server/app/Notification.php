<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    //
    protected $fillable = ['type', 'text', 'url', 'read'];

    protected $table = 'notifications';
}
