<?php

namespace App\Enums;

enum NivelTreino: string
{
    case INICIANTE = 'Iniciante';
    case INTERMEDIARIO = 'Intermediário';
    case AVANCADO = 'Avançado';

    public function id(): int
    {
        return match ($this) {
            self::INICIANTE     => 1,
            self::INTERMEDIARIO => 2,
            self::AVANCADO      => 3,
        };
    }
}