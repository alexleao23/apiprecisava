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
        $this->call(DeputadosTableSeeder::class);
        $this->call(DespesasDeputadosTableSeeder::class);
        $this->call(ReacaoDespesasTableSeeder::class);
        $this->call(ComentariosTableSeeder::class);
        $this->call(RespostasTableSeeder::class);
    }
}
