<?php

use Illuminate\Database\Seeder;

class DeputadosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $linkListaDeputados = 'https://dadosabertos.camara.leg.br/api/v2/deputados?siglaUf=AP&ordem=ASC&ordenarPor=nome';
        $decodedData = json_decode(file_get_contents($linkListaDeputados));
        $deputados = $decodedData->dados;

        $listaLinksDep = [];
        for ($i = 0; $i < count($deputados); $i++) {
            array_push($listaLinksDep, $deputados[$i]->uri);
        }

        $todosDep = [];
        for ($i = 0; $i < count($listaLinksDep); $i++) {
            $dataDecode = json_decode(file_get_contents($listaLinksDep[$i]));
            $finalData = $dataDecode->dados;
            array_push($todosDep, $finalData);
        }


        for($i = 0; $i < count($todosDep); $i++) {
            DB::table('deputados')->insert([
                'id' => $todosDep[$i]->id,
                'nome_civil' => $todosDep[$i]->nomeCivil,
                'nome_eleitoral' => $todosDep[$i]->ultimoStatus->nomeEleitoral,
                'email' => $todosDep[$i]->ultimoStatus->gabinete->email,
                'sexo' => $todosDep[$i]->sexo,
                'escolaridade' => $todosDep[$i]->escolaridade,
                'data_nasc' => $todosDep[$i]->dataNascimento,
                'telefone' => $todosDep[$i]->ultimoStatus->gabinete->telefone,
                'uf_nasc' => $todosDep[$i]->ufNascimento,
                'municipio_nasc' => $todosDep[$i]->municipioNascimento,
                'uf_eleito' => $todosDep[$i]->ultimoStatus->siglaUf,
                'sigla_partido' => $todosDep[$i]->ultimoStatus->siglaPartido,
                'condicao_eleitoral' => $todosDep[$i]->ultimoStatus->condicaoEleitoral,
                'url_foto' => $todosDep[$i]->ultimoStatus->urlFoto
            ]);
        }
    }
}
