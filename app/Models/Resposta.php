<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resposta extends Model
{
    protected $fillable = [
        'usuario_id', 'comentario_id', 'descricao'
    ];

    public function usuario()
    {
        return $this->belongsTo('App\User', 'usuario_id');
    }

    public function comentario()
    {
        return $this->belongsTo('App\Models\Comentario', 'comentario_id');
    }
}
