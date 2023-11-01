<?php

namespace App\Console\Commands;

use App\Models\Game;
use Illuminate\Console\Command;

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
