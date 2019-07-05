<?php

use Illuminate\Database\Seeder;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
           DB::table('categories')->insert([
            'name' => 'study',
            'description' => 'Just for study',
            'icon_name'=>'book',
            'icon_font'=>'Entypo'
        ]);

          DB::table('categories')->insert([
            'name' => 'sport',
            'description' => 'Just for sport',
            'icon_name'=>'tennis-ball',
            'icon_font'=>'MaterialCommunityIcons'
        ]);

          DB::table('categories')->insert([
            'name' => 'culture',
            'description' => 'Just for study',
            'icon_name'=>'account-group',
            'icon_font'=>'MaterialCommunityIcons'
        ]);

          DB::table('categories')->insert([
            'name' => 'Art',
            'description' => 'Just for art',
            'icon_name'=>'feather',
            'icon_font'=>'Feather'
        ]);

    }
}
