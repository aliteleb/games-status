<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{

    protected $table = 'roles_permissions';

    protected $fillable = ['role_id', 'permission'];
}
