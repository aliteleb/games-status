<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Notification;

class NotificationController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $notifications = Notification::with(['game', 'comment'])->where('user_id', $user->id)->latest()->get();

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
