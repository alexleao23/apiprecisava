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
            $table->unsignedInteger('id')->unique();
            $table->unsignedInteger('deputado_id');
            // $table->foreign('deputado_id')->references('id')->on('deputados');
            $table->string('nome_deputado')->nullable();
            $table->string('sigla_uf')->nullable();
            $table->string('sigla_partido')->nullable();
            $table->text('descricao')->nullable();
            $table->string('fornecedor')->nullable();
            $table->string('cpfcnpj_fornecedor')->nullable();
            $table->date('data_emissao')->nullable();
            $table->string('valor_documento')->nullable();
            $table->integer('mes_documento')->nullable();
            $table->integer('ano_documento')->nullable();
            $table->timestamps();
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
