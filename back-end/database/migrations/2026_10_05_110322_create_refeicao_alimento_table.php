<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('refeicao_alimento', function (Blueprint $table) {
            $table->id();
            $table->foreignId('refeicao_id')->constrained('refeicoes')->cascadeOnDelete();
            $table->foreignId('alimento_id')->constrained('alimentos')->cascadeOnDelete();
            $table->decimal('quantidade_gramas', 8, 2)->default(1);
            $table->timestamps();

            $table->unique(['refeicao_id', 'alimento_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('refeicao_alimento');
    }
};