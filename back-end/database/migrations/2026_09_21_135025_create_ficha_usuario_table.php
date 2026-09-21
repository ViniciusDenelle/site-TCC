<?php
// database/migrations/2026_09_14_000005_create_ficha_usuario_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ficha_usuario', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('ficha_treino_id')->constrained('fichas_treino')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['user_id', 'ficha_treino_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ficha_usuario');
    }
};