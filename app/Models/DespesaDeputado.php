<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DespesaDeputado extends Model
{
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
