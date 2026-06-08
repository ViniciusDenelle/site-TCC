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
        Schema::create('objetivos_usuarios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('tipo');
            $table->integer('peso_ideal');
            $table->integer('peso_minimo')->nullable();
            $table->integer('peso_maximo')->nullable();
            $table->decimal('velocidade', 3, 2)->nullable();
            $table->date('comeco');
            $table->date('termino')->nullable();
            $table->integer('duracao')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('objetivo_usuarios');
    }
};
