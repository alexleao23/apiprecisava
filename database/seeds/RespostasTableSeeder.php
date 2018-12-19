<?php

use Illuminate\Database\Seeder;

class RespostasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $resposta1 = DB::table('respostas')->insert([
            'usuario_id' => 2,
            'comentario_id' => 1,
            'descricao' => 'Resposta 1',
        ]);

        $resposta2 = DB::table('respostas')->insert([
            'usuario_id' => 1,
            'comentario_id' => 2,
            'descricao' => 'Resposta 2',
        ]);
    }
}
