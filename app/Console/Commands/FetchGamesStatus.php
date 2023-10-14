<?php

namespace App\Console\Commands;

use App\Models\DrmProtection;
use App\Models\Game;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class FetchGamesStatus extends Command
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
        for ($i = 0; $i <= 417; $i++) {
            $res = Http::get("https://steamcrackedgames.com/api/games/page/" . $i . "/order/-1")->json();
            if (isset($res['games'])) {
                $games = $res['games'];
                foreach ($games as $game) {
                    $g = Game::where('slug', $game['slug'])->first();
                    if (!$g)
                        $g = Game::where('steam_appid', $game['app_id'])->first();

                    if ($g) {
                        $g->drm_protection_id = DrmProtection::firstOrCreate(['name' => $game['drm_protection']])->id;
                        $g->is_aaa = $game['aaa'];
                        if($game['crack_status'] == 2)
                        {
                            $g->crack_date = $game['cracked_date_1'];
                            $g->is_cracked = true;
                        }
                        $this->info($game['name'] . ' Processed');
                    }

                }
                $this->info('Done.');
            }


        }

        $this->info('Page: '.$i);
    }
}
