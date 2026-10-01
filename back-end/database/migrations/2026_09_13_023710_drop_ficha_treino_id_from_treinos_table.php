<?php
// database/migrations/2026_09_12_000004_drop_ficha_treino_id_from_treinos_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('treinos', function (Blueprint $table) {
            $table->dropForeign(['ficha_treino_id']);
            $table->dropColumn('ficha_treino_id');
        });
    }

    public function down(): void
    {
        Schema::table('treinos', function (Blueprint $table) {
            $table->foreignId('ficha_treino_id')
                ->nullable()
                ->after('id')
                ->constrained('fichas_treino')
                ->nullOnDelete();
        });
    }
};