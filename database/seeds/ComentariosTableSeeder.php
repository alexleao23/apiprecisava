<?php

use Illuminate\Database\Seeder;

class ComentariosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $comentario1 = DB::table('comentarios')->insert([
            'usuario_id' => 1,
            'despesa_id' => 1,
            'descricao' => 'Comentário 1',
        ]);

        $comentario2 = DB::table('comentarios')->insert([
            'usuario_id' => 2,
            'despesa_id' => 2,
            'descricao' => 'Comentário 2',
        ]);
    }
}
