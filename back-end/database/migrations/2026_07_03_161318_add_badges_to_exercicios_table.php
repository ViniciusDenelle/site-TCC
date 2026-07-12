<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('exercicios', function (Blueprint $table) {

            $table->foreignId('tipo_id')
                ->after('descricao')
                ->constrained('tipos_exercicio')
                ->restrictOnDelete();

            $table->foreignId('nivel_id')
                ->after('tipo_id')
                ->constrained('niveis_exercicio')
                ->restrictOnDelete();

            $table->foreignId('foco_id')
                ->after('nivel_id')
                ->constrained('focos')
                ->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('exercicios', function (Blueprint $table) {

            $table->dropForeign(['tipo_id']);
            $table->dropForeign(['nivel_id']);
            $table->dropForeign(['foco_id']);

            $table->dropColumn([
                'tipo_id',
                'nivel_id',
                'foco_id'
            ]);
        });
    }
};