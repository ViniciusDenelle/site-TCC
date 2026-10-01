<?php
// database/migrations/2026_09_12_000003_add_treino_id_to_dias_ficha_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('dias_ficha', function (Blueprint $table) {
            $table->foreignId('treino_id')
                ->nullable()
                ->after('dia_semana')
                ->constrained('treinos')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('dias_ficha', function (Blueprint $table) {
            $table->dropForeign(['treino_id']);
            $table->dropColumn('treino_id');
        });
    }
};