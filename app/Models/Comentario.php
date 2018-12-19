<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    protected $fillable = [
        'usuario_id', 'despesa_id','descricao'
    ];

    public function usuario()
    {
        return $this->belongsTo('App\User', 'usuario_id');
    }

    public function despesaDeputado()
    {
        return $this->belongsTo('App\Models\DespesaDeputado', 'despesa_id');
    }

    public function respostas()
    {
        return $this->hasMany('App\Models\Resposta', 'comentario_id');
    }
}
