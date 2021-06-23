<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\User;

class SignUpController extends Controller
{
    public function __invoke(Request $request)
    {
        $operationType = 'sign up.';
        // return response()->json([ $request->all()], 200);
        $now = new \DateTime();
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'name' => 'required',
            'sex' => 'required',
        ]);
        if ($validator->fails()) {
            $errors = $validator->errors();

            return response()->json([
                'status' => [
                    'success' => false,
                    'message' => null,
                    'operationType' => $operationType
                ], $errors
            ], 200);
        } else {
            $status = User::insert([
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'name' =>  $request->name,
                'sex' =>  $request->sex,
                'created_at' => $now,
                'updated_at' => $now
            ]);
            if ($status) {
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
                        'message' => 'This email user already exists.',
                        'operationType' => $operationType
                    ]
                ], 400);
            }
        }
    }
}
