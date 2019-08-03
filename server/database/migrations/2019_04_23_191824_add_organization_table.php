<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOrganizationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('organizations', function (Blueprint $table) {
            //
            //
            $table->increments('id');
            $table->string('name');
            $table->text('description')->nullable();
            $table->text('logoPath');
            $table->text('background')->nullable();
            $table->text('detail')->nullable();
            $table->text('website')->nullable();
            $table->text('email')->nullable();
            $table->text('tel')->nullable();
            $table->text('contact')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    { }
}
