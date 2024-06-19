<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    public function register(Request $request){
        $validateData = $request->validate([
            'name' => 'required|string|max:255',
            'user_name' => 'required|unique:users|max:50',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:4|confirmed',
        ]);

        $user = User::create([
            'name' => $validateData['name'],
            'user_name' => $validateData['user_name'],
            'email' => $validateData['email'],
            'password' => Hash::make($validateData['password']),
            //'password' => bcrypt($validateData['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function login(Request $request){
        $validatedData = $request->validate([
            'user_name' => 'required|string',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt(['user_name' => $validatedData['user_name'], 'password' => $validatedData['password']])) {
        throw ValidationException::withMessages([
            'user_name' => ['The provided credentials are incorrect.'],
        ]);
    }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user_type' => $user->user_type,
            'id' => $user->id
        ]);
    }

    public function logout(Request $request) {
    // Ensure the user is authenticated
    $user = $request->user();

    if ($user) {
        // Delete the current access token
        $user->currentAccessToken()->delete();
        return response()->json(['message' => 'Successfully logged out']);
    }

    return response()->json(['message' => 'User not authenticated'], 401);
}

}
