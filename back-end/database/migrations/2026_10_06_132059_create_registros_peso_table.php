<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('registros_peso', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->decimal('peso', 5, 1);
            $table->date('registrado_em');
            $table->timestamps();

            $table->unique(['user_id', 'registrado_em']); // 1 registro por dia
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registros_peso');
    }
};