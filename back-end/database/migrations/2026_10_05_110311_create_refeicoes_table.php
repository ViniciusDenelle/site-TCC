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
            $table->foreignId('dieta_id')->constrained('dietas')->cascadeOnDelete();
            $table->tinyInteger('dia_semana'); // 0 = domingo ... 6 = sábado
            $table->string('nome'); // ex: "Café da manhã"
            $table->time('horario')->nullable();
            $table->unsignedTinyInteger('ordem')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('refeicoes');
    }
};