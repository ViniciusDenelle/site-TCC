<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Linhas antigas nao apontam para usuario nem dieta, entao sao limpas
        DB::table('dieta_usuario')->delete();

        Schema::table('dieta_usuario', function (Blueprint $table) {
            $table->foreignId('user_id')->after('id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('dieta_id')->after('user_id')->constrained('dietas')->cascadeOnDelete();

            // Uma dieta so pode ser adicionada uma vez por usuario
            $table->unique(['user_id', 'dieta_id']);
        });
    }

    public function down(): void
    {
        Schema::table('dieta_usuario', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['dieta_id']);
            $table->dropUnique(['user_id', 'dieta_id']);
            $table->dropColumn(['user_id', 'dieta_id']);
        });
    }
};