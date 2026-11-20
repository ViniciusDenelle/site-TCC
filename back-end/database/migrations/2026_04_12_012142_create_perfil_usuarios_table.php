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
        Schema::create('perfil_usuarios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('genero');
            $table->integer('peso');
            $table->string('tipo_do_peso');
            $table->integer('altura');
            $table->integer('idade');
            $table->date('data_de_nascimento');
            $table->decimal('nivel_de_atividade', 3, 2);
            $table->string('experiencia');
            $table->string('foto')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perfil_usuarios');
    }
};
