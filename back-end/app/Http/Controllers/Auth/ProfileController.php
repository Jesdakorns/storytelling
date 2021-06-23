<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DateTime;
use \Image;
use Illuminate\Support\Facades\File;

use App\User;

class ProfileController extends Controller
{
    public function __construct(Request $request)
    {

        $this->HOST = $request->server('REQUEST_SCHEME') . '://' . $request->server('HTTP_HOST');
        $this->now = new DateTime();
        $this->dateTime = $this->now->format('j-m-Y-His');
    }

    public function __invoke()
    {
        $this->middleware('auth:api');
        $operationType = 'get profile.';
        if (auth()->user()) {
            // return response()->json($this->guard()->user());
            return response()->json([
                'status' => [
                    'success' => true,
                    'message' => null,
                    'operationType' => $operationType
                ],
                'user' => auth()->user()
            ], 200);
        } else {
            return response()->json([
                'status' => [
                    'success' => false,
                    'message' => 'please login to your account.',
                    'operationType' => $operationType
                ]
            ], 200);
        }
    }
    public function show($id)
    {
        $operationType = 'show profile.';
        $user = User::find($id);
        if ($user) {

            $data = [
                'id' => $user->id,
                'email' => $user->email,
                'name' => $user->name,
                'image' => $user->image,
                'phone' => $user->phone,
                'sex' => $user->sex,
                'address' => $user->address
            ];
            return response()->json([
                'status' => [
                    'success' => true,
                    'message' => null,
                    'operationType' => $operationType
                ],
                'user' => $data
            ], 200);
        } else {
            return response()->json([
                'status' => [
                    'success' => false,
                    'message' => 'please login to your account before edit profile or no data found.',
                    'operationType' => $operationType
                ]
            ], 200);
        }
    }
    public function edit($id)
    {
        $this->middleware('auth:api');
        $operationType = 'edit profile.';
        if (auth()->user()) {
            $user = User::find($id);
            $data = [
                'id' => $user->id,
                'email' => $user->email,
                'name' => $user->name,
                'image' => $user->image,
                'phone' => $user->phone,
                'sex' => $user->sex,
                'address' => $user->address
            ];
            return response()->json([
                'status' => [
                    'success' => true,
                    'message' => null,
                    'operationType' => $operationType
                ],
                'user' => $data
            ], 200);
        } else {
            return response()->json([
                'status' => [
                    'success' => false,
                    'message' => 'please login to your account before edit profile.',
                    'operationType' => $operationType
                ]
            ], 200);
        }
    }
    public function update(Request $request, $id)
    {
        $this->middleware('auth:api');
        $operationType = "update profile";
        if (auth()->user()) {
            $getUser = User::find($id);
            if ($getUser->image != $request->image) {
                $image = $request->image;
                $nameImage = $this->dateTime . '-' . rand() . '.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
                Image::make($image)->resize(450, 450, function ($constraint) {
                    $constraint->aspectRatio();
                })->save(public_path('assets/profile_image/') . $nameImage);
                $pastImage = $this->HOST . '/assets/profile_image/' . $nameImage;

                $user = User::find($id)->update([
                    'name' => $request->name,
                    'email' => $request->email,
                    'phone' => $request->phone,
                    'sex' => $request->sex,
                    'image' => $pastImage,
                    'address' => $request->address
                ]);
                if ($getUser->image !== null && $user) {
                    File::delete(public_path(str_replace($this->HOST, "", $getUser->image)));
                }
            } else {
                $user = User::find($id)->update([
                    'name' => $request->name,
                    'email' => $request->email,
                    'phone' => $request->phone,
                    'sex' => $request->sex,
                    'address' => $request->address
                ]);
            }


            if ($user) {
                return response()->json([
                    'status' => [
                        'success' => true,
                        'message' => $getUser->image,
                        'operationType' => $request->all()
                    ]
                ], 200);
            }
        } else {
            return response()->json([
                'status' => [
                    'success' => false,
                    'message' => 'please login to your account before update profile.',
                    'operationType' => $operationType
                ]
            ], 200);
        }
    }
}
