<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->exam_name,
            'description' => $this->description,
            'duration' => $this->duration,
            'created_by' => $this->creator->name,
            'questions' => QuestionResource::collection($this->questions)

        ];
    }
}
