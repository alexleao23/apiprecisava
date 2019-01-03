<?php

use Illuminate\Http\Request;
use App\Models\DespesaDeputado;
use App\Models\Deputado;
use App\Http\Resources\DespesaDeputadoResource;

Route::post('login', 'Auth\LoginController@login');
Route::post('register', 'Auth\RegisterController@register');

Route::group(['middleware' => 'auth:api'], function(){
    Route::post('logout', 'Auth\LoginController@logout');

    // Retorna o usuário autenticado
    Route::get('user', function(Request $request){
        return $request->user();
    });

    // Lista todos os Deputado Federais do Amapá
    Route::get('deputados', 'DeputadosController@index');

    Route::group(['prefix' => 'deputados/{deputado_id}'], function () {

        //Mostra informações detalhadas de um Deputado Federal do Amapá
        Route::get('', 'DeputadosController@show');

        // Lista as despesas (com as reações do usuário logado em cada despesa)
        // de um Deputado Federal do Amapá
        Route::get('despesas', function($deputado_id){
            return DespesaDeputadoResource::collection(
                DespesaDeputado::where('deputado_id', $deputado_id)->orderBy('data_emissao')->paginate(30)
            );
        });

        // Retorna as quantidades de reações positivas e negativas
        // e também retorna o total de reações para utilizar no ranking
        Route::get('reacoes', 'DeputadosController@reacoes');

        Route::group(['prefix' => 'despesas/{despesa_id}'], function () {
            // Salva uma reação enviada pelo usuário
            Route::post('reacao', 'ReacaoDespesasController@store');

            // Salva um comentário enviado pelo usuário
            Route::post('comentario', 'ComentariosController@store');

            // Retorna as informações de um comentário
            Route::get('comentarios/{comentario_id}', 'ComentariosController@show');

            // Salva uma resposta enviada pelo usuário
            Route::post('comentarios/{comentario_id}/resposta', 'RespostasController@store');
        });

        Route::group(['prefix' => 'despesas/{despesa_id}/comentarios'], function () {
            // Lista os comentários de uma despesa de um deputado
            Route::get('', 'DespesaDeputadosController@showComentarios');

            // Lista as respostas de um comentário
            Route::get('{comentario_id}/respostas', 'ComentariosController@showRespostas');
        });
    });
});
