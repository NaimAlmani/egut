<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddActivitiesPlacesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activity_place', function (Blueprint $table) {
            //
                $table->increments('id');
                $table->integer('place_id')->unsigned();
                $table->foreign('place_id')->references('id')->on('places');
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
        Schema::table('activity_place', function (Blueprint $table) {
            //
        });
    }
}
