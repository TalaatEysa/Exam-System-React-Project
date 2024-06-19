<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuestionResource;
use App\Models\Question;
use Exception;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //$this->authorize('view_question');
        //$this->authorize('viewAny');
        $questions = Question::with('options')->get();
        return QuestionResource::collection($questions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
           // $this->authorize('create_question');
           //$this->authorize('create', Question::class);
            $validatedData = $request->validate([
            'exam_id' => 'required|exists:exams,id',
            'question_text' => 'required|string',
            'options' => 'required|array|min:2',
            'options.*.option_text' => 'required|string',
            'options.*.is_correct' => 'required|boolean',
        ]);
        $question = Question::create([
            'exam_id' => $validatedData['exam_id'],
            'question_text' => $validatedData['question_text'],
        ]);
        $question->options()->createMany($validatedData['options']);
        return "Question with options added sussefully";
        }catch(Exception $e){
            return $e->getMessage();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $question = Question::with('options')->find($id);
        //$this->authorize('view', $question);
        return new QuestionResource($question);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    //$this->authorize('update_question');
    $validatedData = $request->validate([
        'question_text' => 'sometimes|required|string',
        'options' => 'sometimes|required|array|min:2',
        'options.*.option_text' => 'required|string',
        'options.*.is_correct' => 'required|boolean',
    ]);

    $question = Question::findOrFail($id);
    //$this->authorize('update', $question);

    if (isset($validatedData['question_text'])) {
        $question->question_text = $validatedData['question_text'];
    }

    $question->save();

    if (isset($validatedData['options'])) {
        // Delete existing options for the question
        $question->options()->delete();

        // Create new options
        foreach ($validatedData['options'] as $optionData) {
            $question->options()->create([
                'option_text' => $optionData['option_text'],
                'is_correct' => $optionData['is_correct'],
            ]);
        }
    }
    return "Question updated sussefully";

    // return response()->json([
    //     'message' => 'Question with options updated successfully',
    //     'data' => new QuestionResource($question->load('options'))
    // ]);
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
{
    try {
        $question = Question::findOrFail($id);
        //$this->authorize('delete', $question); // Ensure you pass the question instance

        $question->delete();

        return response()->json(['message' => 'Question deleted successfully']);
    } catch (Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}
}
