<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class GameCollection extends ResourceCollection
{
    /**
     * An array to store pagination data that comes from paginate() method.
     * @var array
     */
    protected $pagination;

    /**
     * PaginatedCollection constructor.
     *
     * @param mixed $resource paginated resource using paginate method on models or relations.
     */
    public function __construct($resource)
    {

        $this->pagination = [
            'total' => $resource->total(), // all models count
            'count' => $resource->count(), // paginated result count
            'per_page' => $resource->perPage(),
            'current_page' => $resource->currentPage(),
            'total_pages' => $resource->lastPage()
        ];

        $resource = $resource->getCollection();

        parent::__construct($resource);
    }
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            // our resources
            'data' => $this->collection,

            // pagination data
            'pagination' => $this->pagination
        ];
    }
}
