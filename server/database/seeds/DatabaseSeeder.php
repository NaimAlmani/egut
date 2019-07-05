<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         $this->call(UsersTableSeeder::class);
         $this->call(OrganizationTableSeeder::class);
         $this->call(GroupTableSeeder::class);
         $this->call(CategoryTableSeeder::class);
         $this->call(PlaceTableSeeder::class);
         $this->call(ActivityTableSeeder::class);

         $this->call(ActivityOrganizationTableSeeder::class);
         $this->call(ActivityGroupTableSeeder::class);
         $this->call(ActivityCategoryTableSeeder::class);
         $this->call(ActivityPlaceTableSeeder::class);
         $this->call(DaysTableSeeder::class);

    }
}
