<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dietas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('nome');
            $table->text('descricao')->nullable();
            $table->string('objetivo')->nullable();
            $table->string('nivel')->nullable();
            $table->string('duracao')->nullable();
            $table->decimal('meta_agua', 4, 1)->nullable();
            $table->unsignedInteger('meta_calorias')->nullable();
            $table->decimal('meta_proteinas', 6, 1)->nullable();
            $table->decimal('meta_carboidratos', 6, 1)->nullable();
            $table->decimal('meta_gorduras', 6, 1)->nullable();
            $table->text('observacoes_finais')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dietas');
    }
};