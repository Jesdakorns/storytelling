<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SignOutController extends Controller
{
    public function __invoke()
    {
        $operationType = 'sign out.';
        if (auth()->user()) {
            auth()->logout();
            return response()->json([
                'status' => [
                    'success' => true,
                    'message' => null,
                    'operationType' => $operationType
                ]
            ], 200);
        } else {
            return response()->json([
                'status' => [
                    'success' => false,
                    'message' => 'please login to your account before sign out.',
                    'operationType' => $operationType
                ]
            ], 200);
        }
    }
}
