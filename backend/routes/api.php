<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\Getways\PaypalController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::resource("exams", ExamController::class);
    Route::get("users", [UserController::class, 'index']);
    Route::get("users/{id}", [UserController::class, 'show']);
    Route::resource("questions", QuestionController::class);
    Route::get("results", [ResultController::class, 'index']);
    Route::get("results/user/{id}", [ResultController::class, 'resultsForUser']);
    Route::post("results", [ResultController::class, 'store']);
    Route::post('paypal/payment', [PaypalController::class, 'payment'])->name('paypal.payment');
});
