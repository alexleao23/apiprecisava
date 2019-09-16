<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DespesaDeputado extends Model
{
    protected $fillable = [
      'id', 'deputado_id', 'nome_deputado',
      'sigla_uf', 'sigla_partido', 'descricao',
      'fornecedor', 'cpfcnpj_fornecedor',
      'data_emissao', 'valor_documento',
      'mes_documento', 'ano_documento'
    ];

    public function comentarios()
    {
        return $this->hasMany('App\Models\Comentario', 'despesa_id');
    }

    public function deputado()
    {
        return $this->belongsTo('App\Models\Deputado', 'deputado_id');
    }

    public function reacaoDespesas()
    {
        return $this->hasMany('App\Models\ReacaoDespesa', 'despesa_id');
    }
}
