<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    //
    protected $fillable = ['name', 'email', 'message', 'income', 'read', 'subject'];

    protected $table = 'emails';
}
