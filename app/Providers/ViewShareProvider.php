<?php

namespace App\Providers;

use App\Helpers\QueryManager;
use App\Models\Category;
use App\Models\Media;
use App\Rules\ReadonlyRule;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class ViewShareProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        // Add defer attribute to vite scripts
        Vite::useScriptTagAttributes([
            'defer' => true,
        ]);

        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->registerValidationRules();

        $this->views_share();

        Blade::directive('settings', function ($key) {
            $key = trim($key, '\'');
            return config('settings.' . $key);
        });

        Route::model('media', Media::class);

        //
    }

    private function registerValidationRules()
    {
        $rules = [ReadonlyRule::class];
        foreach ($rules as $class) {
            $alias = (new $class)->__toString();
            if ($alias) {
                Validator::extend($alias, $class . '@passes');
            }
        }
    }

    private function views_share(): void
    {
        // Page title
        $segments = explode('/', trim(request()->getPathInfo(), '/'));
        $title = '';
        if (isset($segments[1]))
            $title .= __('breadcrumb.' . $segments[1]);
        if (isset($segments[count($segments) - 1]))
            $title .= ' - ' . __('breadcrumb.' . $segments[count($segments) - 1]);
        View::share('title', $title . ' | ' . settings('site_title'));

    }

}
