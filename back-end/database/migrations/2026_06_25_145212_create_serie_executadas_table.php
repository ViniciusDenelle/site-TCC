<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('series_executadas', function (Blueprint $table) {
            $table->id();

            $table->foreignId('sessao_treino_id')
                ->constrained('sessoes_treino')
                ->cascadeOnDelete();

            $table->foreignId('exercicio_treino_id')
                ->constrained('exercicios_treino')
                ->cascadeOnDelete();

            $table->integer('serie');

            $table->decimal('peso', 8, 2)->nullable();

            $table->integer('repeticoes');

            $table->boolean('concluida')
                ->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('serie_executadas');
    }
};
