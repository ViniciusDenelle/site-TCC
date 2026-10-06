<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('alimentos', function (Blueprint $table) {
            $table->id();
            $table->string('nome')->unique();
            $table->string('porcao_descricao')->nullable();
            $table->decimal('porcao_gramas', 8, 2)->default(0);
            $table->decimal('calorias', 8, 2);
            $table->decimal('proteinas', 8, 2);
            $table->decimal('carboidratos', 8, 2);
            $table->decimal('gorduras', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alimentos');
    }
};
