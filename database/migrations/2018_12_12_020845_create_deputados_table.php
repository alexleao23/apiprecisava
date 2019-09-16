<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDeputadosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deputados', function (Blueprint $table) {
            $table->unsignedInteger('id')->unique();
            $table->string('nome_civil');
            $table->string('nome_eleitoral');
            $table->string('email');
            $table->string('sexo');
            $table->string('escolaridade')->nullable();
            $table->date('data_nasc')->nullable();
            $table->string('telefone')->nullable();
            $table->string('uf_nasc')->nullable();
            $table->string('municipio_nasc')->nullable();
            $table->string('uf_eleito');
            $table->string('sigla_partido');
            $table->string('condicao_eleitoral');
            $table->string('url_foto');
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
        Schema::dropIfExists('deputados');
    }
}
