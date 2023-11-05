<?php

namespace App\Models;

use App\AppModel;
use App\Observers\SettingObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static create(array $array)
 * @method static where(string $string, int|string $name)
 */
class Setting extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $fillable = [
        'name',
        'label',
        'placeholder',
        'default',
        'section',
        'type',
        'description',
        'options',
        'value',
        'status',
    ];

}
