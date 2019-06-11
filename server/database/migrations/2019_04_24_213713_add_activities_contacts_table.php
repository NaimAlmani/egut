<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddActivitiesContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
          Schema::create('activities_contacts', function (Blueprint $table) {
         $table->increments('id');
                $table->integer('contact_id')->unsigned();
                $table->foreign('contact_id')->references('id')->on('contacts');
                $table->integer('activity_id')->unsigned();
                $table->foreign('activity_id')->references('id')->on('activities');
                $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
