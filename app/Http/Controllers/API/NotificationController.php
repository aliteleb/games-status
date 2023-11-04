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
        return response()->api(
            data: Notification::latest_notifications(),
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
