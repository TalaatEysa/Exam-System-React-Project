<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Exam>
 */
class ExamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'exam_name' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'created_by' => User::factory(), // Create a user if not existing
            'duration' => $this->faker->numberBetween(30, 180),
        ];
    }
}
