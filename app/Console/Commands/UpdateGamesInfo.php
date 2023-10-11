<?php

namespace App\Console\Commands;

use App\Models\DrmProtection;
use App\Models\Game;
use App\Models\Genre;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class UpdateGamesInfo extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'games:update-info';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean steam games: Remove any DLC or any tools keep games only';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        while (true) {
            try {
                // Your existing code
                $this->process();
                // Sleep for a specific time before the next iteration (e.g., 5 minutes)
            } catch (\Exception $e) {
                $this->error("An error occurred: " . $e->getMessage());
                // Optionally, you can log the error or take other actions
                // Sleep for a shorter time before the next iteration (e.g., 1 minute) in case of an error
            }
        }
    }

    function process()
    {
        $game = Game::where('type', 'game')->whereNull('release_date')->inRandomOrder()->first();

        try {
            $steam_game = Http::get("https://store.steampowered.com/api/appdetails?appids=" . $game->steam_appid);

            if ($steam_game->successful()) {

                $data = $steam_game->json();

                if ($data == null) {
                    $this->info("Game `{$game->name} - {$game->steam_appid}` Skipped.");
                    return;
                }

                if (!isset($data[$game->steam_appid]) || !isset($data[$game->steam_appid]["success"])) {
                    $this->info("Game `{$game->name} - {$game->steam_appid}` Skipped.");
                    return;
                }

                $data = $steam_game[$game->steam_appid]["data"];
                $game->release_date = $data['release_date']['date'];
                $game->drm_protection_id = 1;


                if(isset($data["genres"]))
                {
                    $genres = $data["genres"];
                    foreach ($genres as $g)
                    {
                        $genre = Genre::firstOrCreate(['name' => $g["description"]]);
                        $game->genres()->attach([$genre->id]);
                    }
                }

                $game->save();
                $this->info("Game `{$game->name} - {$game->steam_appid}` Updated.");
            }
        } catch (\Exception $e) {
            $this->error("Error making HTTP request for game: {$game->name} - {$game->steam_appid}");
            $this->error($e->getMessage());
            return;
        }

    }
}
