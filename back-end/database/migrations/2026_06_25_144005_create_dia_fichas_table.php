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
        Schema::create('dias_ficha', function (Blueprint $table) {
            $table->id();

            $table->foreignId('ficha_treino_id')
                ->constrained('fichas_treino')
                ->cascadeOnDelete();

            $table->tinyInteger('dia_semana');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dia_fichas');
    }
};
