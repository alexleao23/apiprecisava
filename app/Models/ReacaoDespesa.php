<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReacaoDespesa extends Model
{
    protected $fillable = [
        'usuario_id', 'despesa_id', 'reacao'
    ];

    public function usuario()
    {
        return $this->belongsTo('App\User', 'usuario_id');
    }
    public function despesa()
    {
        return $this->belongsTo('App\Models\DespesaDeputado', 'despesa_id');
    }
}
