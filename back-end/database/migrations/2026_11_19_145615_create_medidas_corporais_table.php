<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('medidas_corporais', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('tipo');
            $table->decimal('valor', 6, 2);
            $table->date('data');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('medidas_corporais');
    }
};
