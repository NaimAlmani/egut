<?php

use Illuminate\Database\Seeder;

class ActivityGroupTableSeeder extends Seeder
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
DB::table('activity_group')->insert([
            'group_id' => '1',
            'activity_id' => '1',
        ]);
DB::table('activity_group')->insert([
            'group_id' => '2',
            'activity_id' => '1',
        ]);
DB::table('activity_group')->insert([
            'group_id' => '1',
            'activity_id' => '2',
        ]);
DB::table('activity_group')->insert([
            'group_id' => '2',
            'activity_id' => '2',
        ]);
DB::table('activity_group')->insert([
            'group_id' => '3',
            'activity_id' => '2',
        ]);
    }
}
