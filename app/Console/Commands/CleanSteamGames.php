<?php

namespace App\Console\Commands;

use App\Models\Game;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class CleanSteamGames extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:clean-steam-games';

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
        // $this->info("Starting ...");

        // $all_games = Game::whereNull("type")->get();

        // $this->info("Games: {$all_games->count()}");
        // $this->info("Started");

        $game = Game::whereNull('type')->inRandomOrder()->first();

        if (!$game)
            return;

        $game->slug = Str::slug(strtolower($game->name));
        $game->save();

        try {
            $steam_game = Http::timeout(10)->get("https://store.steampowered.com/api/appdetails?appids=" . $game->steam_appid);

            if ($steam_game->successful()) {

                try {
                    $steam_game = $steam_game->json();

                    if ($steam_game == null) {
                        $this->info("Game `{$game->name} - {$game->steam_appid}` Skipped.");
                        return;
                    }

                    if (!isset($steam_game[$game->steam_appid]) || !isset($steam_game[$game->steam_appid]["success"])) {
                        $this->info("Game `{$game->name} - {$game->steam_appid}` Skipped.");
                        return;
                    }

                    $success = $steam_game[$game->steam_appid]["success"];
                    if (!$success) {
                        $game->type = 'invalid';
                        $game->save();
                        $this->info("Game `{$game->name} - {$game->steam_appid}` Invalid.");
                        return;
                    }

                    $type = $steam_game[$game->steam_appid]["data"]["type"];

                    $game->type = $type;
                    $game->save();

                    $this->info("Game `{$game->name} - {$game->steam_appid}` Updated.");
                } catch (\Exception $e) {
                    $this->error("Error processing game: {$game->name} - {$game->steam_appid}");
                    $this->error($e->getMessage());
                    return;
                }


            } else {
                $this->error("HTTP request failed for game: {$game->name} - {$game->steam_appid}");
            }
        } catch (\Exception $e) {
            $this->error("Error making HTTP request for game: {$game->name} - {$game->steam_appid}");
            $this->error($e->getMessage());
            return;
        }

    }
}
