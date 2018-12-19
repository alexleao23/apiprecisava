<?php

use Illuminate\Database\Seeder;

class DespesasDeputadosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sqls = database_path('seeds/sql/*.sql');
        $lista = app('files')->glob($sqls);
        foreach ($lista as $sql) {
            $raw = explode(';', file_get_contents($sql));
            for ($i = 0; $i < count($raw) - 1; $i++) {
                DB::insert($raw[$i]);
            }
        }
    }
}
