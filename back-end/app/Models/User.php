<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\PerfilUsuario;
use App\Models\ObjetivosUsuario;
use App\Models\MetricasUsuario;
use App\Models\Role;
use App\Models\Inscrições;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function perfil(): HasOne
    {
        return $this->hasOne(PerfilUsuario::class);
    }

    public function inscrições(): HasOne
    {
        return $this->hasOne(Inscrições::class);
    }

    public function metricas() : HasOne
    {
        return $this->hasOne(MetricasUsuario::class);
    }

    public function objetivos(): HasOne
    {
        return $this->hasOne(ObjetivosUsuario::class);
    }

    public function exerciciosCriados()
    {
        return $this->hasMany(Exercicio::class, 'user_id');
    }

    public function treinosCriados()
    {
        return $this->hasMany(Treino::class, 'user_id');
    }

    public function fichasCriadas()
    {
        return $this->hasMany(FichaTreino::class, 'user_id');
    }

    public function exerciciosAdicionados()
    {
        return $this->belongsToMany(Exercicio::class, 'exercicio_usuario', 'user_id', 'exercicio_id')
            ->withTimestamps();
    }

    public function treinosAdicionados()
    {
        return $this->belongsToMany(Treino::class, 'treino_usuario', 'user_id', 'treino_id')
            ->withTimestamps();
    }

    public function fichasAdicionadas()
    {
        return $this->belongsToMany(FichaTreino::class, 'ficha_usuario', 'user_id', 'ficha_treino_id')
            ->withTimestamps();
    }

    public function dietasCriadas()
    {
        return $this->hasMany(Dieta::class, 'user_id');
    }

    public function dietasAdicionadas()
    {
        return $this->belongsToMany(Dieta::class, 'dieta_usuario', 'user_id', 'dieta_id')
            ->withTimestamps();
    }
}
