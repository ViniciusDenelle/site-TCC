<?php
// database/migrations/2026_09_12_000002_add_divisao_ficha_id_to_treinos_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('treinos', function (Blueprint $table) {
            $table->foreignId('divisao_ficha_id')
                ->nullable()
                ->after('ficha_treino_id')
                ->constrained('divisoes_ficha')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('treinos', function (Blueprint $table) {
            $table->dropForeign(['divisao_ficha_id']);
            $table->dropColumn('divisao_ficha_id');
        });
    }
};