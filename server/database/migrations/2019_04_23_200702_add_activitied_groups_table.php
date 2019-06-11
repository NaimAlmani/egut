<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddActivitiedGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activity_group', function (Blueprint $table) {
            //
                $table->increments('id');
                $table->integer('group_id')->unsigned();
                $table->foreign('group_id')->references('id')->on('groups');
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
        Schema::table('activity_group', function (Blueprint $table) {
            //
        });
    }
}
