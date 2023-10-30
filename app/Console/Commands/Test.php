<?php

namespace App\Console\Commands;

use App\Models\DrmProtection;
use App\Models\Game;
use App\Models\Group;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
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
        $games = Game::whereNull('crack_date')->get();

        foreach ($games as $game)
        {
            $game->game_status_id = 1;

            $game->save();

            $this->info($game->id .' processed.');

        }

        $this->info('Test command processed successfully.');
    }
}
