<?php

namespace App\Console\Commands;

use App\Models\DrmProtection;
use App\Models\Game;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class Test extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test command';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $drms = DrmProtection::all();

        foreach ($drms as $drm)
        {
            $drm->slug = str()->slug($drm->name);
            $drm->save();
            $this->info("DRM `{$drm->name}` processed successfully.");
        }

        $this->info('Test command processed successfully.');
    }
}
