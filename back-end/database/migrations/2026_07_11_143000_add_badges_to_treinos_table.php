<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('treinos', function (Blueprint $table) {

            $table->foreignId('tipo_id')
                ->nullable()
                ->constrained('tipos_treino')
                ->restrictOnDelete();

            $table->foreignId('nivel_id')
                ->nullable()
                ->constrained('niveis_exercicio')
                ->restrictOnDelete();

            $table->foreignId('foco_id')
                ->nullable()
                ->constrained('focos')
                ->restrictOnDelete();

        });
    }

    public function down(): void
    {
        Schema::table('treinos', function (Blueprint $table) {

            $table->dropForeign(['categoria_id']);
            $table->dropForeign(['nivel_id']);
            $table->dropForeign(['foco_id']);

            $table->dropColumn([
                'categoria_id',
                'nivel_id',
                'foco_id'
            ]);

        });
    }
};