<?php
 
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
 
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('historico_pesos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->decimal('peso', 5, 1);
            $table->date('registrado_em');
            $table->timestamps();
 
            // Um registro por dia para cada usuário
            $table->unique(['user_id', 'registrado_em']);
        });
    }
 
    public function down(): void
    {
        Schema::dropIfExists('historico_pesos');
    }
};
 