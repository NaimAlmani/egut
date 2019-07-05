<?php

use Illuminate\Database\Seeder;

class OrganizationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
          DB::table('organizations')->insert([
            'name' => 'SGN',
            'description' => 'Wrok to gether',
            'logoPath'=>'default.jpg'
        ]);
            DB::table('organizations')->insert([
            'name' => 'save the children',
            'description' => 'organization to  children',
            'logoPath'=>'default.jpg'
        ]);
            DB::table('organizations')->insert([
            'name' => 'Vi unga',
            'description' => 'youth org',
            'logoPath'=>'default.jpg'
        ]);
            DB::table('organizations')->insert([
            'name' => 'Grupp av knopparna',
            'description' => 'Wrok to gether',
            'logoPath'=>'default.jpg'
        ]);

    }
}
