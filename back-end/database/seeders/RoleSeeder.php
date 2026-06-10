<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create([
            'nome' => 'gratis'
        ]);

        Role::create([
            'nome' => 'premium'
        ]);

        Role::create([
            'nome' => 'admin'
        ]);
    }
}
