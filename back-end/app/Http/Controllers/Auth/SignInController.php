<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SignInController extends Controller
{
    public function __construct()
    { }
    public function __invoke(Request $request)
    {
        $operationType = 'sign in.';
        if (!$token = auth()->attempt($request->only('email', 'password'))) {

            return response()->json([
                'status' => [
                    'success' => false,
                    'message' => 'email or password incorrect',
                    'operationType' => $operationType
                ],
                'user' => [
                    'token' => null
                ]
            ], 200);
        }
        return response()->json([
            'status' => [
                'success' => true,
                'message' => null,
                'operationType' => $operationType
            ],
            'user' => compact('token'),
            'expires_in' => auth()->factory()->getTTL()
        ], 200);
    }
}
