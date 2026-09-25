<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\PerfilUsuario;
use App\Models\ObjetivosUsuario;
use App\Models\MetricasUsuario;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::create([
            'name' => 'Vinicius',
            'email' => 'vinicius@gmail.com',
            'password' => '12345678',
            'role_id' => 1
        ]);

        PerfilUsuario::create([
            'user_id' => $user->id,
            'genero' => 'Masculino',
            'peso' => 70,
            'tipo_do_peso' => 'kg',
            'altura' => 175,
            'idade' => 18,
            'data_de_nascimento' => '2008-01-15',
            'nivel_de_atividade' => 1.55,
            'experiencia' => 'Intermediário',
        ]);

        ObjetivosUsuario::create([
            'user_id' => $user->id,
            'tipo' => 'Ganhar massa muscular',
            'peso_ideal' => 75,
            'peso_minimo' => 72,
            'peso_maximo' => 78,
            'velocidade' => 0.50,
            'comeco' => '2026-09-25',
            'termino' => '2027-03-25',
            'duracao' => 181,
        ]);

        MetricasUsuario::create([
            'user_id' => $user->id,
            'peso' => 70,
            'calorias_diarias' => 2500,
            'TMB' => 1700,
            'GET' => 2500,
        ]);
    }
}

