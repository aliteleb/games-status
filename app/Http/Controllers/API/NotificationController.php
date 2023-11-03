<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\GameResource;
use App\Models\Notification;

class NotificationController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $notifications = Notification::with(['game', 'comment'])->where('user_id', $user->id)->latest()->get();


        $notifications.map(function (string $notification) {
            if($notification->game !== null)
            {
                $game = $notification->game;
                unset($notification->game);
                $notification->game = new GameResource($game);
            }
        });
        return response()->api(
            data: $notifications,
            message: __('Notifications')
        );
    }

    public function markAsRead(Notification $notification)
    {
        $notification->update(['is_read' => true]);

        return response()->api(
            data: [],
            message: __('Notification marked as read.')
        );
    }
}
