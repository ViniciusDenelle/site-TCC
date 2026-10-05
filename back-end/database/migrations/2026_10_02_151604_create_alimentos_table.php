<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('alimentos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('refeicao_id')->constrained('refeicoes')->cascadeOnDelete();
            $table->string('nome');
            $table->string('quantidade')->nullable();
            $table->decimal('calorias', 7, 1)->nullable();
            $table->decimal('proteinas', 6, 1)->nullable();
            $table->decimal('carboidratos', 6, 1)->nullable();
            $table->decimal('gorduras', 6, 1)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('alimentos');
    }
};