<?php

use Illuminate\Database\Seeder;

class PlaceTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
            DB::table('places')->insert([
            'name' => 'Ungdomshuset',
            'description' => 'ungdomshuset',
            'favorite'=>true,
            'image'=>'default.jpg'
        ]);
         DB::table('places')->insert([
            'name' => 'Sport hall',
            'description' => 'sports',
            'favorite'=>true,
            'image'=>'default.jpg'
        ]);

           DB::table('places')->insert([
            'name' => 'Theater',
            'description' => 'art',
            'favorite'=>false,
            'image'=>'default.jpg'
        ]);

    }
}
