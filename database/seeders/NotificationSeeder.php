<?php

namespace Database\Seeders;

use App\Models\Notification;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Notification::create([
            'type' => 'game_status',
            'user_id' => 1,
            'game_id' => 123,
            'comment_id' => null,
            'is_read' => false,
        ]);

        Notification::create([
            'type' => 'reply',
            'user_id' => 2,
            'game_id' => 12,
            'comment_id' => 789,
            'is_read' => false,
        ]);

        //
    }
}
