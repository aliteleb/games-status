<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\GameResource;
use App\Models\Notification;
use Carbon\Carbon;

class NotificationController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $notifications = Notification::with(['game', 'comment'])->where('user_id', $user->id)->latest()->get();

        $notifications->each(function ($notification) {
            if ($notification->game !== null) {
                $notification->game_info = new GameResource($notification->game);
                unset($notification->game);
            }
            $time = Carbon::parse($notification->created_at)->diffForHumans();
            $notification->time = $time;
            unset($notification->created_at);
            unset($notification->updated_at);
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
