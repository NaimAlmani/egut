<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    //
    protected $fillable = ['email', 'read'];

    protected $table = 'subscriptions';
}
