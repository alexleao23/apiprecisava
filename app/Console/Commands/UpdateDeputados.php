<?php

namespace App\Console\Commands;

use App\Console\Commands\UpdateDatabase;
use App\Models\Deputado;

class UpdateDeputados extends UpdateDatabase
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:deputados';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Atualiza a tabela de deputados';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
      parent::__construct();
    }

    public function deputadosInfo()
    {
      foreach ($this->deputadosId() as $deputado_id) {
        \DB::beginTransaction();
          $deputado = Deputado::find($deputado_id);
          if (!$deputado) {
            $deputado_api = json_decode(
              file_get_contents("{$this->api_link}/{$deputado_id}")
            )->dados;

            Deputado::create([
              'id' => $deputado_api->id,
              'nome_civil' => $deputado_api->nomeCivil,
              'nome_eleitoral' => $deputado_api->ultimoStatus->nomeEleitoral,
              'email' => $deputado_api->email,
              'sexo' => $deputado_api->sexo,
              'escolaridade' => $deputado_api->escolaridade,
              'data_nasc' => $deputado_api->dataNascimento,
              'telefone' => $deputado_api->ultimoStatus->gabinete->telefone,
              'uf_nasc' => $deputado_api->ufNascimento,
              'municipio_nasc' => $deputado_api->municipioNascimento,
              'uf_eleito' => $deputado_api->ultimoStatus->siglaUf,
              'sigla_partido' => $deputado_api->ultimoStatus->siglaPartido,
              'condicao_eleitoral' => $deputado_api->ultimoStatus->condicaoEleitoral,
              'url_foto' => $deputado_api->ultimoStatus->urlFoto
            ]);
          }
        \DB::commit();
      }
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
      $this->deputadosInfo();
    }
}
