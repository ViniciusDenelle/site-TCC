<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exercicio_equipamento', function (Blueprint $table) {
            $table->id();

            $table->foreignId('exercicio_id')
                ->constrained('exercicios')
                ->cascadeOnDelete();

            $table->foreignId('equipamento_id')
                ->constrained('equipamentos')
                ->cascadeOnDelete();

            $table->timestamps();

            $table->unique([
                'exercicio_id',
                'equipamento_id'
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exercicio_equipamento');
    }
};