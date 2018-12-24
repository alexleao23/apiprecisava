<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReacaoDespesaResource extends JsonResource
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
            'usuario_id' => $this->usuario_id,
            'despesa_id' => $this->despesa_id,
            'reacao' => $this->reacao
        ];
    }
}
