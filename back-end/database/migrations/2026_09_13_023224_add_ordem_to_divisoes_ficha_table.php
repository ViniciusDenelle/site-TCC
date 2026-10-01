<?php
// database/migrations/2026_09_12_000001_add_ordem_to_divisoes_ficha_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('divisoes_ficha', function (Blueprint $table) {
            $table->unsignedInteger('ordem')->default(0)->after('divisao');
        });
    }

    public function down(): void
    {
        Schema::table('divisoes_ficha', function (Blueprint $table) {
            $table->dropColumn('ordem');
        });
    }
};