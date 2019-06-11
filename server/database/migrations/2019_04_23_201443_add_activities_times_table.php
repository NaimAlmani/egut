<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddActivitiesTimesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activities_times', function (Blueprint $table) {
            //
                $table->increments('id');
                $table->integer('activity_id')->unsigned();
                $table->integer('place_id')->unsigned();
                $table->integer('day_id')->unsigned();
                $table->dateTime('start_time');
                $table->dateTime('end_time');
                $table->boolean('is_weekly')->default(true);
                $table->dateTime('date');
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
        Schema::table('activities_times', function (Blueprint $table) {
            //
        });
    }
}
