<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('refeicoes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dieta_id')->constrained()->cascadeOnDelete();
            $table->string('dia_semana', 10);
            $table->string('nome');
            $table->time('horario')->nullable();
            $table->unsignedSmallInteger('ordem')->default(0);
            $table->timestamps();

            $table->index(['dieta_id', 'dia_semana']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('refeicoes');
    }
};