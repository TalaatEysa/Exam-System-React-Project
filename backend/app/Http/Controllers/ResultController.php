<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResultResource;
use App\Models\Result;
use Illuminate\Http\Request;

class ResultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $results = Result::with(['exam','user'])->get();
        return ResultResource::collection($results);
    }

    public function resultsForUser($userID){
        $results = Result::with(['exam','user'])->where('user_id',$userID)->get();
        return ResultResource::collection($results);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'exam_id' => 'required|exists:exams,id',
            'user_id' => 'required|exists:users,id',
            'score' => 'required|integer',
            //'submission_date' => 'required|date',
        ]);
        $result = Result::create($validatedData);
        return new ResultResource($result);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
