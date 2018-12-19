<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deputado extends Model
{
    protected $fillable = [
        'id', 'nome_civil', 'nome_eleitoral', 'email',
        'sexo', 'escolaridade', 'data_nasc', 'telefone',
        'uf_nasc', 'municipio_nasc', 'uf_eleito', 'sigla_partido',
        'condicao_eleitoral', 'url_foto'
    ];

    public function despesas()
    {
        return $this->hasMany('App\Models\DespesaDeputado', 'deputado_id');
    }
}
