<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('exercicios', function (Blueprint $table) {

            $table->foreignId('categoria_id')
                ->after('descricao')
                ->constrained('categorias_exercicio')
                ->restrictOnDelete();

            $table->foreignId('nivel_id')
                ->after('categoria_id')
                ->constrained('niveis_exercicio')
                ->restrictOnDelete();

            $table->foreignId('tipo_id')
                ->after('nivel_id')
                ->constrained('tipos_exercicio')
                ->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('exercicios', function (Blueprint $table) {

            $table->dropForeign(['categoria_id']);
            $table->dropForeign(['nivel_id']);
            $table->dropForeign(['tipo_id']);

            $table->dropColumn([
                'categoria_id',
                'nivel_id',
                'tipo_id'
            ]);
        });
    }
};