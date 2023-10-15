<?php

namespace App\Console\Commands;

use App\Models\DrmProtection;
use App\Models\Game;
use App\Models\Group;
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
        $games = Game::where('type', 'game')->whereNull('last_check')->get();
        $count = $games->count();
        $this->info("Remaining Games :`{$games->count()}`");
        for ($i = 0; $i < $count; $i++) {

            $game = $games[$i];

            $debug_res = null;
            try {
                $response = Http::post('https://gamestatus.info/back/api/gameinfo/game/search_title/', [
                    'title' => $game->name,
                ]);

                $data = $response->json();
                $debug_res = $response->json();
                if (count($data) == 0) {
                    $game->last_check = now();
                    $game->save();
                    $this->warn("Game `{$game->name}` Skipped.");
                    continue;
                }

                $data = $data[0];
                $protections = json_decode($data['protections']);
                $groups = json_decode($data['hacked_groups']);

                /*
                if($data['title'] !== $game->name){
                    $game->last_check = now();
                    $game->save();
                    $this->warn("Game `{$game->name}` Skipped.");
                    continue;
                }
                */

                if ($protections == null) {
                    $protection = DrmProtection::firstOrCreate(['name' => strtoupper($data['protections'])]);
                    $game->protections()->attach([$protection->id]);
                } else {
                    foreach ($protections as $p) {
                        $protection = DrmProtection::firstOrCreate(['name' => strtoupper($p)]);
                        $game->protections()->attach([$protection->id]);
                    }
                }

                if ($groups == null) {
                    $group = Group::firstOrCreate(['name' => strtoupper($data['hacked_groups'])]);
                    $game->groups()->attach([$group->id]);
                } else {
                    foreach ($groups as $g) {
                        $group = Group::firstOrCreate(['name' => strtoupper($g)]);
                        $game->groups()->attach([$group->id]);
                    }
                }

                $game->is_aaa = $data['is_AAA'];
                $game->release_date = $data['release_date'];
                $game->crack_date = $data['crack_date'];
                $game->meta_score = $data['mata_score'];
                $game->user_score = $data['user_score'];
                $game->is_offline_act = $data['is_offline_act'];
                $game->last_check = now();
                $game->need_crack = true;
                $game->save();
                $this->info("Game `{$game->name}` processed.");
            } catch (\Exception $e) {
                dump($e);
                // dd($debug_res);
            }

        }
        $this->info("Done!");

    }
}
