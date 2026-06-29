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
        Schema::create('exercicios_treino', function (Blueprint $table) {
            $table->id();

            $table->foreignId('exercicio_id')
                ->constrained('exercicios')
                ->cascadeOnDelete();

            $table->foreignId('treino_id')
                ->constrained('treinos')
                ->cascadeOnDelete();

            $table->integer('ordem');

            $table->integer('repeticoes_minimas');
            $table->integer('repeticoes_maximas');
            $table->integer('sets');

            $table->integer('peso')->nullable();
            $table->integer('descanso')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exercicio_treinos');
    }
};
