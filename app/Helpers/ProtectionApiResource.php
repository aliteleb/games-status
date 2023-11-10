<?php

namespace App\Helpers;

use App\Http\Resources\StatusResource;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

class ProtectionApiResource
{
    protected array $result = [];
    protected array $hidden = [];
    protected $data;

    function __construct($data, $hidden = [])
    {
        $this->data = $data;
        $this->hidden = $hidden;

        $this->init();
    }

    private function init()
    {
        $data = [];
        if ($this->data instanceof Collection) {
            foreach ($this->data as $game) {
                $data[] = $this->handel($game);
            }
            $this->result = $data;
        } else if ($this->data instanceof LengthAwarePaginator) {
            foreach ($this->data->items() as $game) {
                $data[] = $this->handel($game);
            }
            $this->result = $data;
            $data = $this->data->toArray();
            $data['data'] = $this->result;
            $this->result = $data;
        } else {
            $this->result = $this->handel($this->data);
        }

    }

    private function handel($protection)
    {
        $data = [
            'id' => $protection->id,
            'name' => $protection->name,
            'slug' => $protection->slug,
            'games' => $protection->games,
            'games_count' => $protection->games_count,
        ];

        return $this->removeHidden($data);
    }

    private function removeHidden($game)
    {
        foreach ($this->hidden as $prop) {
            unset($game[$prop]);
        }

        return $game;
    }

    public function get()
    {
        return $this->result;
    }

}
