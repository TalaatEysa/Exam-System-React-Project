<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExamResource;
use App\Models\Exam;
use Exception;
use Illuminate\Http\Request;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //return Exam::all();
        $exams = Exam::all();
        return ExamResource::collection($exams);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $validatedData = $request->validate([
            'exam_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'created_by' => 'required|exists:users,id',
            'duration' => 'required|integer'
        ]);
        $exam = Exam::create($validatedData);
        //return response()->json($exam, 201);
        return "Exam added sussefully";
        }catch(Exception $e){
            return $e->getMessage();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //return Exam::findOrFail($id);
        $exam = Exam::findOrFail($id);
        return new ExamResource($exam);
    }

    /**
     * Show the form for editing the specified resource.
     */

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try{
            $validatedData = $request->validate([
                'exam_name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'created_by' => 'required|exists:users,id',
                'duration' => 'required|integer'
            ]);
            $exam = Exam::findOrFail($id);
            $exam->update($validatedData);
            return "Exam updated sussefully";
        }catch(Exception $e){
            return $e->getMessage();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //$exam = Exam::findOrFail($id);
        Exam::destroy($id);
        return "Exam deleted sussefully";
    }
}
