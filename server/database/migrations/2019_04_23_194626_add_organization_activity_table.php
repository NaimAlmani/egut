<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOrganizationActivityTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activity_organization', function (Blueprint $table) {
            //
                $table->increments('id');
                $table->integer('organization_id')->unsigned();
                $table->foreign('organization_id')->references('id')->on('organizations');
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
        Schema::table('activity_organization', function (Blueprint $table) {
            //
        });
    }
}
