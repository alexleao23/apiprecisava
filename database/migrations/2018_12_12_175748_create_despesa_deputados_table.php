<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDespesaDeputadosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('despesa_deputados', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('deputado_id');
            $table->foreign('deputado_id')->references('id')->on('deputados');
            $table->string('nome_deputado');
            $table->string('sigla_uf');
            $table->string('sigla_partido');
            $table->text('descricao');
            $table->string('fornecedor');
            $table->string('cpfcnpj_fornecedor')->nullable();
            $table->date('data_emissao')->nullable();
            $table->string('valor_documento');
            $table->integer('mes_documento');
            $table->integer('ano_documento');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('despesa_deputados');
    }
}
