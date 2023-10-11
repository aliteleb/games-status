<?php

namespace App\Console\Commands;

use App\Models\Game;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class FetchSteamGames extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fetch-steam-games';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch and store Steam games in the database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $appListResponse = Http::get("https://api.steampowered.com/ISteamApps/GetAppList/v2/");
        $appList = $appListResponse->json()['applist']['apps'];

        foreach ($appList as $app) {
            try {
                $game = Game::where('steam_appid', $app['appid'])->first();
                if(!$game)
                {
                    Game::create([
                        'name' => $app['name'],
                        'type' => null,
                        'slug' => Str::slug(strtolower($app['name']) . $app['appid']),
                        'steam_appid' => $app['appid']
                    ]);
                    $this->info("Game ID {$app['appid']} processed.");
                }
                $this->error("Game ID {$app['appid']} Already exists.");
            } catch (\Exception $e) {}
        }

        /*
        foreach ($appList as $app) {
            // Fetch detailed information about each game
            $appDetailsResponse = Http::get("https://store.steampowered.com/api/appdetails/?appids={$app['appid']}");
            $appDetails = $appDetailsResponse->json();

            // Check if the game details are available and the game is not free (you can modify this condition)
            if ($appDetails && $appDetails[$app['appid']]['success'] && !$appDetails[$app['appid']]['data']['is_free']) {
                // Store the game details in the database
                Game::updateOrCreate(
                    ['app_id' => $app['appid']],
                    ['name' => $appDetails[$app['appid']]['data']['name']]
                );

                $this->info("Game ID {$app['appid']} processed.");
            }
        }
        */

        $this->info('Steam games fetched and stored successfully.');
    }
}
