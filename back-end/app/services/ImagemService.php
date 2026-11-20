<?php
namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ImagemService
{
    public function salvar(UploadedFile $arquivo, string $pasta, ?string $antiga = null): string
    {
        if ($antiga) {
            Storage::disk('public')->delete($antiga);   
        }

        
        return $arquivo->store($pasta, 'public');       
    }

    public function remover(?string $caminho): void
    {
        if ($caminho) Storage::disk('public')->delete($caminho);
    }
}