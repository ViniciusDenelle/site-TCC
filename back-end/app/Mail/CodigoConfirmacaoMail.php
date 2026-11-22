<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CodigoConfirmacaoMail extends Mailable
{
    use Queueable, SerializesModels;

    // Propriedade pública fica disponível automaticamente na view Blade
    public $codigo;

    public function __construct($codigo)
    {
        $this->codigo = $codigo;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Seu Código de Confirmação',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.codigo', // Certifique-se de que o arquivo resources/views/emails/codigo.blade.php existe
        );
    }

    public function attachments(): array
    {
        return [];
    }
}