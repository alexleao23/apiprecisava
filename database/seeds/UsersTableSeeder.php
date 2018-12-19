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
        $usuario1 = DB::table('users')->insert([
            'nome' => 'Usuario1',
            'email'=> 'usuario1@mail.com',
            'data_nasc'=> '2000-01-01',
            'password'=> bcrypt('usuario1'),
        ]);
        $usuario2 = DB::table('users')->insert([
            'nome' => 'Usuario2',
            'email'=> 'usuario2@mail.com',
            'data_nasc'=> '2000-01-01',
            'password'=> bcrypt('usuario2'),
        ]);
    }
}
