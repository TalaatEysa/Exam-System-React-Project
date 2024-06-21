<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResultResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'exam_name' => $this->exam->exam_name,
            'user_name' => $this->user->name,
            'score' => $this->score,
            'id'=> $this->id,
            'submission_date' => $this->submission_date,
        ];
    }
}
