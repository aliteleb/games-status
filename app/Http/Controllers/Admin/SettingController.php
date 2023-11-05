<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\File;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $settings = Setting::all();
        $sections = $settings->pluck('section')->unique();

        $media_datatable = Media::class::datatable(['buttons' => [], 'actions' => [], 'delete' => false, 'multiselect' => false]);

        return view('admin.settings.index', compact('settings', 'sections', 'media_datatable'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        // Get all settings
        $allSettings = Setting::all();

        // Get the input fields
        $fields = $request->all();

        $updatedSettings = [];

        // Process each setting
        foreach ($allSettings as $setting) {
            $fieldName = $setting->name;

            if (isset($fields[$fieldName])) {
                $fieldValue = $this->castField($fields[$fieldName], $setting->type);
                $updatedSettings[$fieldName] = $fieldValue;
            } else {
                $updatedSettings[$fieldName] = null;
            }
        }

        // Remove null values
        $updatedSettings = array_filter($updatedSettings, function ($value) {
            return $value !== null;
        });

        // Update settings in the database
        foreach ($updatedSettings as $name => $setting) {
            Setting::where('name', $name)->update(['value' => $setting]);
        }

        // Save settings to config/settings.php
        $settingsArray = Setting::all()->pluck('value', 'name')->toArray();

        if (!File::exists(config_path('settings.php'))) {
            Config::set('settings', $settingsArray);
        }

        File::put(config_path('settings.php'), '<?php return ' . var_export($settingsArray, true) . ';');

        // Clear view cache
        Artisan::call('view:clear');

        return back();
    }


    private function castField($value, $dataType)
    {
        return match ($dataType) {
            'select', 'image', 'text', 'email' => (string)$value,
            'boolean' => filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE),
            'number' => filter_var($value, FILTER_VALIDATE_FLOAT, ['flags' => FILTER_NULL_ON_FAILURE]),
            default => $value,
        };
    }


}
