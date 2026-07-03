<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exercicio_musculo', function (Blueprint $table) {
            $table->id();

            $table->foreignId('exercicio_id')
                ->constrained('exercicios')
                ->cascadeOnDelete();

            $table->foreignId('musculo_id')
                ->constrained('musculos')
                ->cascadeOnDelete();

            // 1 = Primário | 2 = Secundário
            $table->tinyInteger('tipo');

            $table->timestamps();

            $table->unique([
                'exercicio_id',
                'musculo_id'
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exercicio_musculo');
    }
};