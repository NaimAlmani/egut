<?php

use Illuminate\Database\Seeder;

class ActivityPlaceTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
               //
DB::table('activity_place')->insert([
            'place_id' => '1',
            'activity_id' => '1',
        ]);
DB::table('activity_place')->insert([
            'place_id' => '2',
            'activity_id' => '1',
        ]);
DB::table('activity_place')->insert([
            'place_id' => '1',
            'activity_id' => '2',
        ]);
DB::table('activity_place')->insert([
            'place_id' => '2',
            'activity_id' => '2',
        ]);
DB::table('activity_place')->insert([
            'place_id' => '3',
            'activity_id' => '2',
        ]);
    }

}
