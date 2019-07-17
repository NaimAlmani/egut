<?php

use Illuminate\Database\Seeder;

class MembersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('Members')->insert([
            'name' => 'Mohammad Alzoubi',
            'email' => 'mhmd@gmail.com',
            'tel' => '0760459899',
            'is_confirmd' => true,

        ]);

        DB::table('Members')->insert([
            'name' => 'Khalil  Albash',
            'email' => 'khalil@gmail.com',
            'tel' => '0760455899',
            'is_confirmd' => true,

        ]);

        DB::table('Members')->insert([
            'name' => 'hassan alsiad',
            'email' => 'mhmd@gmail.com',
            'tel' => '0760457899',
            'is_confirmd' => true,

        ]);

        DB::table('Members')->insert([
            'name' => 'Danial svenson',
            'email' => 'danial@gmail.com',
            'tel' => '07760459899',
            'is_confirmd' => true,

        ]);
        DB::table('activities_members')->insert([
            'activity_id' => '1',
            'member_id' => '1',
            'is_active' => true,
        ]);

        DB::table('activities_members')->insert([
            'activity_id' => '1',
            'member_id' => '2',
            'is_active' => true,
        ]);

        DB::table('activities_members')->insert([
            'activity_id' => '1',
            'member_id' => '3',
            'is_active' => true,
        ]);
        DB::table('activities_members')->insert([
            'activity_id' => '2',
            'member_id' => '2',
            'is_active' => true,
        ]);
        DB::table('activities_members')->insert([
            'activity_id' => '2',
            'member_id' => '3',
            'is_active' => true,
        ]);
    }
}
