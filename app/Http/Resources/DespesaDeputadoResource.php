<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DespesaDeputadoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'deputado_id' => $this->deputado_id,
            'nome_deputado' => $this->nome_deputado,
            'sigla_uf' => $this->sigla_uf,
            'sigla_partido' => $this->sigla_partido,
            'descricao' => $this->descricao,
            'fornecedor' => $this->fornecedor,
            'cpfcnpj_fornecedor' => $this->cpfcnpj_fornecedor,
            'data_emissao' => $this->data_emissao,
            'valor_documento' => $this->valor_documento,
            'mes_documento' => $this->mes_documento,
            'ano_documento' => $this->ano_documento,
            'reacao_usuario' => ReacaoDespesaResource::collection(
                $this->reacaoDespesas->where('usuario_id', \Auth::user()->id)
            ),
            'num_reacoes_pos' => count(ReacaoDespesaResource::collection(
                $this->reacaoDespesas->where('reacao', 1)
            )),
            'num_reacoes_neg' => count(ReacaoDespesaResource::collection(
                $this->reacaoDespesas->where('reacao', 0)
            ))
        ];
    }
}
