<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        \App\User::create([
            'name' => config('app.user_name'),
            'email' =>config('app.init_email'),
            'password' => bcrypt(config('app.init_pass'))
        ]);
    }
}
