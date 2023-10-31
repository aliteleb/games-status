<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'country_code',
        'gender',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    protected $appends = ['avatar', 'small_avatar'];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    public function games()
    {
        return $this->belongsToMany(Game::class);
    }

    public function getFollowingAttribute()
    {
        if (auth()->check() && auth()->user()->id == $this->id)
            return DB::table('game_user')->select(['game_id'])->where('user_id', $this->id)->get()->pluck('game_id');
        return [];

    }

    public function getAvatarAttribute()
    {
        return asset('assets/images/users/100/' . $this->id . '.webp');
    }

    public function getSmallAvatarAttribute()
    {
        return asset('assets/images/users/50/' . $this->id . '.webp');
    }

}
