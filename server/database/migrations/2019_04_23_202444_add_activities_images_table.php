<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddActivitiesImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activities_images', function (Blueprint $table) {
            //
               $table->increments('id');
               $table->integer('activity_id')->unsigned();
               $table->text('path');
               $table->string('type');
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
        Schema::table('activities_images', function (Blueprint $table) {
            //
        });
    }
}
