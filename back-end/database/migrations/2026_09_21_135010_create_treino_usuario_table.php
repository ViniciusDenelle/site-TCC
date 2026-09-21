<?php
// database/migrations/2026_09_14_000004_create_treino_usuario_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('treino_usuario', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('treino_id')->constrained('treinos')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['user_id', 'treino_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('treino_usuario');
    }
};