<?php

use Illuminate\Database\Seeder;

class GroupTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
           DB::table('groups')->insert([
            'name' => 'Man',
            'description' => 'Just for men',
            'icon_name'=>'ios-man',
            'icon_font'=>'Ionicons'
        ]);

         DB::table('groups')->insert([
            'name' => 'Women',
            'description' => 'Just for men',
            'icon_name'=>'ios-woman',
            'icon_font'=>'Ionicons'
        ]);

         DB::table('groups')->insert([
            'name' => 'Children',
            'description' => 'Just for Children',
            'icon_name'=>'human-child',
            'icon_font'=>'MaterialCommunityIcons'
        ]);

         DB::table('groups')->insert([
            'name' => 'Family',
            'description' => 'Just for Family',
            'icon_name'=>'account-child',
            'icon_font'=>'MaterialCommunityIcons'
        ]);
    }
}
