<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comentario;
use App\Models\Deputado;

class ComentariosController extends Controller
{
    protected $comentarios;

    public function __construct(Comentario $comentarios)
    {
        $this->comentarios = $comentarios;
    }

    public function showRespostas($deputado_id, $despesa_id, $comentario_id)
    {
        $comentario = $this->comentarios->find($comentario_id);
        return $comentario->respostas;

    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $comentario = Comentario::create([
            'usuario_id' => \Auth::user()->id,
            'despesa_id' => $request->despesa_id,
            'descricao' => $request->descricao
        ]);
        return response()->json($comentario, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($deputado_id, $despesa_id, $comentario_id)
    {
        return $this->comentarios->find($comentario_id);
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
