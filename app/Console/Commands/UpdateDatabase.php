<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class UpdateDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:info';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Descrição para o uso dos comandos update';

    /**
     * Create a new command instance.
     *
     * @return void
     */

    // Link da API da Câmara dos Deputados
    protected $api_link = 'https://dadosabertos.camara.leg.br/api/v2/deputados';

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */

    public function deputadosId() {
      $deputados = json_decode(
        file_get_contents("{$this->api_link}?siglaUf=AP&ordem=ASC&ordenarPor=nome")
      );

      $deputados_id = [];
      foreach ($deputados->dados as $deputado) {
        array_push($deputados_id, $deputado->id);
      }

      return $deputados_id;
    }

    public function handle()
    {
      echo "Classe base para os seguintes comandos:\n";
      echo "\nAtualiza a table de deputados\n";
      echo "php artisan update:deputados\n";
      echo "\n";
      echo "Atualiza a tabela de despesa_deputados\n";
      echo "php artisan update:despesas";
    }
}
