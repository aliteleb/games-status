<?php

namespace App\Models;

use App\Api\GameApiResource;
use App\Http\Resources\GameResource;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = ['type', 'user_id', 'game_id', 'comment_id', 'is_read'];
    protected $casts = [
        'is_read' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class, 'game_id');
    }

    public function comment(): BelongsTo
    {
        return $this->belongsTo(Comment::class, 'comment_id');
    }

    public static function latest_notifications()
    {
        $user = auth()->user();
        if (!$user) {
            return collect([]);
        }
        $notifications_response = new \stdClass();
        $notifications = Notification::with(['game' => function ($query) {
            return $query->with('groups');
        }, 'comment'])->where('user_id', $user->id)->latest()->get();

        $notifications->each(function ($notification) {
            if ($notification->game !== null) {
                $notification->game_info = (new GameApiResource($notification->game));
                unset($notification->game);
            }
            Carbon::setLocale('en');
            $time = Carbon::parse($notification->created_at)->diffForHumans();
            $notification->time = $time;
            unset($notification->created_at);
            unset($notification->updated_at);
        });

        $notifications_response->notifications_count = $notifications->count();
        $notifications_response->unread_notifications = $notifications->where('is_read', false)->count();
        $notifications_response->notifications = $notifications;
        return $notifications_response;
    }
}
