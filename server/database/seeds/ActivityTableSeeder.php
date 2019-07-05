<?php

use Illuminate\Database\Seeder;

class ActivityTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
          DB::table('activities')->insert([
            'name' => 'Strong Women',
            'description' => 'women',
            'logoPath'=>'default.jpg',
            'is_active'=>true
        ]);
          DB::table('activities')->insert([
            'name' => 'football competent',
            'description' => 'football',
            'logoPath'=>'default.jpg',
            'is_active'=>true
        ]);
          DB::table('activities')->insert([
            'name' => 'Drawing club',
            'description' => 'drawing',
            'logoPath'=>'default.jpg',
            'is_active'=>false
        ]);
    }
}
