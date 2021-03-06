<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\User;

class ComentarioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $user = User::find($this->usuario_id);
        return [
            'id' => $this->id,
            'despesa_id' => $this->despesa_id,
            'descricao' => $this->descricao,
            'nome_usuario' => $user->nome,
            'created_at' => $this->created_at
        ];
    }
}
