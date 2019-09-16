<?php

namespace App\Console\Commands;

use App\Console\Commands\UpdateDatabase;
use App\Models\Deputado;
use App\Models\DespesaDeputado;

class UpdateDespesas extends UpdateDatabase
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:despesas';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Atualiza a tabela de despesa_deputados';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    protected function createDespesas(Deputado $deputado, $despesa_api){
      \DB::beginTransaction();
        DespesaDeputado::create([
          'id' => $despesa_api->codDocumento,
          'deputado_id' => $deputado->id,
          'nome_deputado' => $deputado->nome_eleitoral,
          'sigla_uf' => $deputado->uf_eleito,
          'sigla_partido' => $deputado->sigla_partido,
          'descricao' => $despesa_api->tipoDespesa,
          'fornecedor' => $despesa_api->nomeFornecedor,
          'cpfcnpj_fornecedor' => $despesa_api->cnpjCpfFornecedor,
          'data_emissao' => $despesa_api->dataDocumento,
          'valor_documento' => $despesa_api->valorDocumento,
          'mes_documento' => $despesa_api->mes,
          'ano_documento' => $despesa_api->ano
        ]);
      \DB::commit();
    }

    public function deputadoDespesas()
    {
      $deputados = Deputado::all();
      foreach ($deputados as $deputado) {
        $links_paginas = json_decode(
          file_get_contents("{$this->api_link}/{$deputado->id}/despesas?itens=100&ordem=DESC&ordenarPor=ano")
        )->links;

        $ultima_pagina = 0;
        foreach ($links_paginas as $link) {
          if ($link->rel == 'last') {
            $ultima_pagina = (int) explode(
              '&',
              explode('pagina=', $link->href)[1]
            )[0];
          }
        }

        $deputado_despesas_api = [];
        $pagina = 1;
        while ($pagina <= $ultima_pagina) {
          $despesas_pagina = json_decode(
            file_get_contents("{$this->api_link}/{$deputado->id}/despesas?&ordem=DESC&ordenarPor=ano&pagina={$pagina}&itens=100")
          )->dados;

          foreach ($despesas_pagina as $despesa) {
            array_push($deputado_despesas_api, $despesa);
          }

          $pagina++;
        }

        $despesas_deputado = DespesaDeputado::where(
          'deputado_id', $deputado->id
        )->get();

        foreach ($deputado_despesas_api as $despesa_api) {
          if ($despesas_deputado->count() > 0) {
            foreach ($despesas_deputado as $despesa_deputado) {
              if (
                $despesa_deputado->id != $despesa_api->codDocumento &&
                $despesa_api->codDocumento != 0
              ) {
                echo "Nova Despesa!\n";
                $this->createDespesas($deputado, $despesa_api);
              }
            }
          } else {
            if ($despesa_api->codDocumento != 0) {
              echo "Nova Despesa!\n";
              $this->createDespesas($deputado, $despesa_api);
            }
          }
        }
      }
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
      $this->deputadoDespesas();
    }
}
