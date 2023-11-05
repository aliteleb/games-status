<?php

namespace App\Models;

use App\Helpers\AdvancedDataTable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'editable', 'super_user'];
    protected $appends = ['permissions_count'];

    public static function datatable(): AdvancedDataTable
    {
        $datatable = new AdvancedDataTable(Role::class);
        $datatable->columns = ['name', 'permissions_count'];
        $datatable->actions = [
            'edit_item' => [
                "method" => "view",
                "icon" => "edit"
            ],
            'delete_item' => [
                "icon" => "trash"
            ],
        ];
        $datatable->add_method = "view";
        return $datatable;
    }

    // Accessors
    public function permissionsCount(): Attribute
    {

        return new Attribute(get: function ($value) {

            if($this->super_user)
                return 'ــــ';

            return Permission::where('role_id', $this->id)->count();
        });
    }

    // Relations
    public function permissions(): HasMany
    {
        return $this->hasMany(Permission::class, 'role_id', 'id');
    }

    // Functions
    public function hasPermission($permission)
    {
        // Replace underscores with dots in the permission string
        $permission = str_replace('_', '.', $permission);

        // Check if the user has the given permission
        return $this->permissions->where('permission', $permission)->count() > 0;
    }

}
