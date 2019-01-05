<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Deputado;

class DeputadosController extends Controller
{
    public function reacoes() {
        $deputados = Deputado::all();
        $todasReacoes = [];
        foreach ($deputados as $deputado) {
          $despesas = $deputado->despesas;
          $reacoesPositivas = [];
          $reacoesNegativas = [];
          $reacoes = [];
          foreach ($despesas as $despesa) {
              foreach ($despesa->reacaoDespesas as $reacao) {
                  if($reacao->reacao == 1) {
                      array_push($reacoesPositivas, $reacao);
                  }
                  if($reacao->reacao == 0) {
                      array_push($reacoesNegativas, $reacao);
                  }
                  if(isset($reacao)) {
                      array_push($reacoes, $reacao);
                  }
              }
          }
          array_push($todasReacoes, [
              'deputado_id' => $deputado->id,
              'reacoes_positiva' => count($reacoesPositivas),
              'reacoes_negativas' => count($reacoesNegativas),
              'total_reacoes' => count($reacoes)
            ]);
        }
      return response()->json($todasReacoes);
    }
    // public function despesasDeputado($deputado_id)
    // {
    //     $deputado = Deputado::find($deputado_id);
    //     return $deputado->despesas;
    // }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Deputado::select()->orderBy('nome_eleitoral')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($deputado_id)
    {
        return Deputado::find($deputado_id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
