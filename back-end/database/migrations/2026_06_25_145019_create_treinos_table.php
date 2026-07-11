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
        Schema::create('treinos', function (Blueprint $table) {
            $table->id();

            $table->foreignId('ficha_treino_id')
                ->nullable()
                ->constrained('fichas_treino')
                ->cascadeOnDelete();

            $table->string('nome');
            $table->text('descricao')->nullable();

            $table->integer('tempo_estimado')->nullable();
            $table->integer('calorias_estimadas')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('treinos');
    }
};
