<?php
// database/migrations/2026_09_14_000003_create_exercicio_usuario_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exercicio_usuario', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('exercicio_id')->constrained('exercicios')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['user_id', 'exercicio_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exercicio_usuario');
    }
};