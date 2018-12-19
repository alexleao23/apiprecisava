<?php

use Illuminate\Database\Seeder;

class ReacaoDespesasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $reacao1 = DB::table('reacao_despesas')->insert([
            'usuario_id' => 1,
            'despesa_id' => 1,
            'reacao' => true
        ]);

        $reacao2 = DB::table('reacao_despesas')->insert([
            'usuario_id' => 1,
            'despesa_id' => 2,
            'reacao' => false
        ]);

        $reacao3 = DB::table('reacao_despesas')->insert([
            'usuario_id' => 2,
            'despesa_id' => 1,
            'reacao' => false
        ]);

        $reacao4 = DB::table('reacao_despesas')->insert([
            'usuario_id' => 2,
            'despesa_id' => 2,
            'reacao' => true
        ]);
    }
}
