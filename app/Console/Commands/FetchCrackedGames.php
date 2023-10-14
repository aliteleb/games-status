<?php

namespace App\Console\Commands;

use App\Models\Game;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class FetchCrackedGames extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fetch-games-status';

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
        $games = Http::get("https://steamcrackedgames.com/api/games/page/5/order/-1")->json()["games"];
        foreach ($games as $game)
        {
            $this->info($game['name'].': '.$game['crack_status']);
        }

        return;
        for($i = 0; $i <= 417; $i++)
        {
            $games = Http::get("https://steamcrackedgames.com/api/games/page/".$i."/order/-1");

        }
        $appListResponse = Http::get("https://api.steampowered.com/ISteamApps/GetAppList/v2/");
        $appList = $appListResponse->json()['applist']['apps'];


        $this->info('Steam games fetched and stored successfully.');
    }
}
