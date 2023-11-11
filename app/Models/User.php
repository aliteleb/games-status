<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Helpers\AdvancedDataTable;
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
        'display_name',
        'media_id',
        'email',
        'country_code',
        'gender',
        'password',
        'avatar',
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
        'status' => 'boolean',
    ];

    protected $appends = [
        'avatar_html',
        'avatar_src'
    ];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    public function games()
    {
        return $this->belongsToMany(Game::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class)->with(['comment', 'game']);
    }

    public function getFollowingAttribute()
    {
        if (auth()->check() && auth()->user()->id == $this->id)
            return DB::table('game_user')->select(['game_id'])->where('user_id', $this->id)->get()->pluck('game_id');
        return [];

    }

    public function getLargeAvatarAttribute()
    {
        return asset('media/images/users/200/' . $this->id . '.webp');

        return null;
    }
    public function getMediumAvatarAttribute()
    {
        return asset('media/images/users/100/' . $this->id . '.webp');

        return null;
    }
    public function getSmallAvatarAttribute()
    {
        return asset('media/images/users/50/' . $this->id . '.webp');

        return null;
    }

    public function getDisplayNameAttribute($value)
    {
        if ($value)
            return $value;

        if ($this->username)
            return $this->username;

        return null;
    }

    // Relations
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public static function datatable(): AdvancedDataTable
    {
        $datatable = new AdvancedDataTable(User::class);
        $datatable->columns = ['avatar_html', 'username', 'email', 'role.name', 'status'];
        $datatable->extra_selection = ['media_id'];
        $datatable->modal_fields = [
            'avatar_src' => 'media|80x80',
            'username' => 'text',
            'email' => 'email',
            'description' => 'textarea',
            'password' => 'password',
            'role_id' => 'select|' . Role::class . ',name',
            'status' => 'boolean',
        ];
        $datatable->appends = ['image_src' => 'image'];

        $datatable->actions = [
            'edit_item' => [
                "icon" => "edit"
            ],
            'delete_item' => [
                "icon" => "trash"
            ],
        ];

        return $datatable;
    }

    // Validation
    public static function validate($user = null): array
    {
        $rules = [
            'name' => 'required|string|min:3|max:255',
            'image' => 'nullable|numeric',
            'email' => 'required|email|unique:users,email',
            'slug' => 'required|alpha_dash|unique:users,slug',
            'description' => 'nullable|string|min:3|max:255',
            'role_id' => 'required|numeric',
            'password' => 'required|min:8|max:32',
            'status' => 'required|in:0,1',
        ];

        // User roles checks
        if ($user && request()->has('role_id')) {

            $role = Role::find($user->role_id);

            // Only superuser left
            $isOnlySuperUser = $role->super_user && User::where('role_id', $role->id)->count() === 1;

            // Changed his own role not allowed
            $isSelfRoleChangeRequest = $user->id === auth()->user()->id && request()->role_id != auth()->user()->role_id;

            if ($isOnlySuperUser || $isSelfRoleChangeRequest)
                $rules["role_id"] = 'readonly';
        }

        // Validate the fields
        return validate_rules($rules, $user, request()->all());
    }

    protected function getAvatarSrcAttribute()
    {
        if ($this->avatar && isset($this->avatar->sizes) && count($this->avatar->sizes) > 0)
        {
            return array_values($this->avatar->sizes)[0];
        }
        return 'https://dummyimage.com/80/8db4ff/000';
    }

    protected function getAvatarHtmlAttribute()
    {
        return $this->avatar !== null ? '<img width="80" height="80" src="' . $this->avatar_src . '"' : '';
    }


}
