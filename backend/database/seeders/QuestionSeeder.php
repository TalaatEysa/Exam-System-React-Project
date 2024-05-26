<?php

namespace Database\Seeders;

use App\Models\Question;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Option;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         Question::factory()
            ->count(10)
            ->create()
            ->each(function ($question) {
                $options = Option::factory()->count(4)->create(['question_id' => $question->id]);
                // Randomly pick one option to be correct
                $correctOption = $options->random();
                $correctOption->update(['is_correct' => true]);
            });
    }
}
