<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSizeToImage extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('activities_images', function (Blueprint $table) {
            //
              $table->integer('width');
              $table->integer('height');
              $table->longText('description')->nullable();
              $table->string('title')->nullable();
              $table->dropColumn(['type']);

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
