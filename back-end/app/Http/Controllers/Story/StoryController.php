<?php

namespace App\Http\Controllers\Story;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use DateTime;
use \Image;
use DB;

use App\User;
use App\SR_Storys;
use App\SI_StorysImage;
use App\SLI_StorysLinkedImage;
use App\SL_StorysLike;
use App\CM_Comment;

class StoryController extends Controller
{
    public function __construct(Request $request)
    {
        $this->HOST = $request->server('REQUEST_SCHEME') . '://' . $request->server('HTTP_HOST');
        $this->now = new DateTime();
        $this->dateTime = $this->now->format('j-m-Y-His');
    }
    public function changeDate($date)
    {
        $get_date = explode("-", $date);
        $month = array("01" => "ม.ค.", "02" => "ก.พ", "03" => "มี.ค.", "04" => "เม.ย.", "05" => "พ.ค.", "06" => "มิ.ย.", "07" => "ก.ค.", "08" => "ส.ค.", "09" => "ก.ย.", "10" => "ต.ค.", "11" => "พ.ย.", "12" => "ธ.ค.");
        $get_month = $get_date["1"];
        $year = $get_date["0"] + 543;
        return $get_date["2"] . " " . $month[$get_month] . " " . $year;
    }
    public function __invoke()
    {

        $operationType = 'get all storys.';
        // ->select('users.*',DB::raw('sum(sl_like) as sl_like'))->groupBy('sl_userId')->orderby('sl_like', 'DESC')
        // Get all data from the SR_Storys table.
        $SR_Storys = SR_Storys::orderBy('id', 'DESC')->get();
        $storysRank = SR_Storys::join('sl_storys_like', 'sl_storys_like.sl_sr_id', '=', 'sr_storys.id')
            ->select('sr_storys.*', DB::raw('SUM(sl_like) as sl_like'))->groupBy('sl_sr_id')->orderby('sl_like', 'DESC')->get();
        $avatarRank = User::join('sr_storys', 'sr_storys.sr_userId', '=', 'users.id')->join('sl_storys_like', 'sl_storys_like.sl_sr_id', '=', 'sr_storys.id')->select('users.*', DB::raw('sum(sl_like) as sl_like'))->groupBy('sr_userId')->orderby('sl_like', 'DESC')->get();
        // dd($storysRank->toArray());
        if (count($SR_Storys) > 0) {
            foreach ($SR_Storys as $key => $value) {
                $SL_StorysLike = SL_StorysLike::where('sl_sr_id', '=', $value->id)->count('sl_like');
                $storys[$key] = [
                    'id' => $value->id,
                    'title' => $value->sr_title,
                    'description' => $value->sr_description,
                    'abstract' => $value->sr_abstract,
                    'story' => $value->sr_story,
                    'coverImage' => $value->sr_coverImage,
                    'userId' => $value->sr_userId,
                    'created_at' => $value->created_at,
                    'updated_at' => $value->updated_at,
                    'countLike' => $SL_StorysLike
                ];
            }
            $arrStorysRank = [];
            $countStorysRank = 0;
            foreach ($storysRank as $key => $value) {


                if ($value->sl_like !== "0") {
                    // echo($countStorysRank);
                    if ($countStorysRank < 8) {

                        $arrStorysRank[$countStorysRank] = [
                            'id' => $value->id,
                            'title' => $value->sr_title,
                            'description' => $value->sr_description,
                            'abstract' => $value->sr_abstract,
                            'story' => $value->sr_story,
                            'coverImage' => $value->sr_coverImage,
                            'userId' => $value->sr_userId,
                            'created_at' => $value->created_at,
                            'updated_at' => $value->updated_at,
                            'countLike' => $value->sl_like
                        ];
                        $countStorysRank++;
                    }
                }
            }
            $arrAvatarRank = [];
            $countAvatarRank = 0;
            foreach ($avatarRank as $key => $value) {

                if ($value->sl_like !== "0") {
                    if ($countAvatarRank < 14) {
                        $arrAvatarRank[$countAvatarRank] = [
                            'id' => $value->id,
                            'name' => $value->name,
                            'email' => $value->email,
                            'phone' => $value->phone,
                            'image' => $value->image,
                            'sex' => $value->sex,
                            'address' => $value->address,
                            'countLike' => $value->sl_like,
                        ];
                        $countAvatarRank++;
                    }
                }
            }

            return response()->json([
                'status' => [
                    'success' => true,
                    'message' => null,
                    'operationType' => $operationType
                ],
                'storys' => $storys,
                'storysRank' => count($arrStorysRank) > 0 ? $arrStorysRank : null,
                'avatarRank' =>  count($arrAvatarRank) > 0 ? $arrAvatarRank : null,
            ], 200);
        } else {
            return response()->json([
                'status' => [
                    'success' => true,
                    'message' => 'data not found',
                    'operationType' => $operationType
                ],
                'storys' => null,
                'storysRank' => null,
                'avatarRank' => null
            ], 200);
        }
    }

    public function type()
    {
    }
    public function list($limit , $category)
    {
        $operationType = 'list story.';

        $SR_Storys = SR_Storys::orderBy('id', 'DESC')->paginate($limit);
        if (count($SR_Storys) > 0) {
            return response()->json([
                'status' => [
                    'success' => true,
                    'message' => null,
                    'operationType' => $operationType
                ],
                'page' => $limit,
                'category' => $category,
                'SR_Storys' => $SR_Storys
            ],  200);
        }else{
            return response()->json([
                'status' => [
                    'success' => false,
                    'message' => null,
                    'operationType' => $operationType
                ],
                'page' => $limit,
                'category' => $category,
                'SR_Storys' => null
            ],  200);
        }
    
    }


    public function my()
    {
        $this->middleware('auth:api');

        $operationType = 'my story.';

        if (auth()->user()) {
            // Gets information from the SR_Storys table, where user id is equal to sr_userId.
            $SR_Storys = SR_Storys::where('sr_userId', '=', auth()->user()->id)->orderBy('id', 'DESC')->paginate(5);;
            if (count($SR_Storys) > 0) {
                foreach ($SR_Storys as $key => $value) {
                    $storys[$key]['story'] = [
                        'id' => $value,
                        'title' => $value->sr_title,
                        'description' => $value->sr_description,
                        'abstract' => $value->sr_abstract,
                        'story' => $value->sr_story,
                        'coverImage' => $value->sr_coverImage,
                        'userId' => $value->sr_userId,
                        'created_at' => $value->created_at,
                        'updated_at' => $value->updated_at
                    ];
                 
                }
                return response()->json([
                    'status' => [
                        'success' => true,
                        'message' => null,
                        'operationType' => $operationType
                    ],
                    'storys' =>  $SR_Storys
                ],  200);
            } else {
                return response()->json([
                    'status' => [
                        'success' => false,
                        'message' => 'data not found',
                        'operationType' => $operationType
                    ],
                    'storys' => null
                ],  200);
            }
        } else {
            return response()->json([
                'status' => [
                    'success' => false,
                    'message' => 'please login to your account before get my storys.',
                    'operationType' => $operationType
                ]
            ], 200);
        }
    }
    public function show($id)
    {
        $operationType = 'show story.';
        // Get information from SR_Storys table by id
        $SR_Storys = SR_Storys::find($id);
        $User = User::find($SR_Storys->sr_userId);
        if ($SR_Storys) {
            // Get information from the SR_Storys table, where sli_sr_id is equal to story id.
            $SLI_StorysLinkedImage =  SLI_StorysLinkedImage::where('sli_sr_id', '=', $SR_Storys->id)->get();
            foreach ($SLI_StorysLinkedImage as $key => $value) {
                // Get information from SI_StorysImage table by sli_si_id
                $SI_StorysImage =  SI_StorysImage::find($value->sli_si_id);
                $images[$key] = [
                    'id' => $SI_StorysImage->id,
                    'image' => $SI_StorysImage->si_image
                ];
            }
            // Separate date and time
            $created_at = explode(" ", $SR_Storys->created_at);
            $updated_at = explode(" ", $SR_Storys->updated_at);
            if (auth()->user()) {
                $SL_StorysLike = SL_StorysLike::where('sl_userId', '=', auth()->user()->id)->where('sl_sr_id', '=', $id)->get();
                // echo $SL_StorysLike[0]->sl_like;
            }
            //dd(count($SL_StorysLike) > 0);
            $storys = [
                'id' => $SR_Storys->id,
                'title' => $SR_Storys->sr_title,
                'description' => $SR_Storys->sr_description,
                'abstract' => $SR_Storys->sr_abstract,
                'story' => $SR_Storys->sr_story,
                'images' => $images,
                'like' => auth()->user() && count($SL_StorysLike) > 0 ? $SL_StorysLike[0]->sl_like : 0,
                'created_at' => $this->changeDate($created_at[0]) . " " . $created_at[1],
                'updated_at' => $this->changeDate($updated_at[0]) . " " . $updated_at[1]
            ];

            $profile = [
                'id' => $User->id,
                'name' => $User->name,
                'image' => $User->image,
            ];
            return response()->json([
                'status' => [
                    'success' => true,
                    'message' => null,
                    'operationType' => $operationType
                ],
                'storys' => $storys,
                'profile' => $profile
            ],  200);
        } else {
            return response()->json([
                'status' => [
                    'success' => false,
                    'message' => 'data not found',
                    'operationType' => $operationType
                ]
            ],  200);
        }
    }
    public function store(Request $request)
    {
        $this->middleware('auth:api');

        $operationType = 'store story.';

        if (auth()->user()) {
            // Validator request
            $validator = Validator::make($request->all(), [
                'title' => 'required',
                'description' => 'required',
                'abstract' => 'required',
                'story' => 'required',
                'coverImage' => 'required',
                'illustration' => 'required|max:6'
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                return response()->json([
                    'status' => [
                        'success' => false,
                        'message' => $errors,
                        'operationType' => $operationType
                    ]
                ],  200);
            } else {
                if ($request->coverImage && $request->illustration) {
                    $coverImage = $request->coverImage;
                    $nameCoverImage = $this->dateTime . '-' . rand() . '.' . explode('/', explode(':', substr($coverImage, 0, strpos($coverImage, ';')))[1])[1];
                    Image::make($coverImage)->resize(550, 550, function ($constraint) {
                        $constraint->aspectRatio();
                    })->save(public_path('assets/cover_image/') . $nameCoverImage);
                    $pastCoverImage = '/assets/cover_image/' . $nameCoverImage;
                    $SR_storysId = SR_Storys::insertGetId([
                        'sr_title' => $request->title,
                        'sr_description' => $request->description,
                        'sr_abstract' => $request->abstract,
                        'sr_story' => $request->story,
                        'sr_coverImage' => $pastCoverImage,
                        'sr_userId' => auth()->user()->id,
                        'created_at' => $this->now,
                        'updated_at' => $this->now
                    ]);
                    $illustration = $request->illustration;
                    foreach ($illustration as $key => $value) {
                        $nameIllustration = $this->dateTime . '-' . rand() . '.' . explode('/', explode(':', substr($value, 0, strpos($value, ';')))[1])[1];
                        Image::make($value)->resize(550, 550, function ($constraint) {
                            $constraint->aspectRatio();
                        })->save(public_path('assets/illustration/') . $nameIllustration);
                        $pastIllustration =  '/assets/illustration/' . $nameIllustration;
                        if ($SR_storysId) {
                            $SI_StorysImageId = SI_StorysImage::insertGetId([
                                'si_image' => $pastIllustration,
                                'created_at' => $this->now,
                                'updated_at' => $this->now
                            ]);
                            if ($SI_StorysImageId) {
                                $SLI_StorysLinkedImage = SLI_StorysLinkedImage::insert([
                                    'sli_si_id' => $SI_StorysImageId,
                                    'sli_sr_id' => $SR_storysId,
                                    'created_at' => $this->now,
                                    'updated_at' => $this->now
                                ]);
                                if ($SLI_StorysLinkedImage) {
                                    $storeStatus = true;
                                } else {
                                    SR_Storys::find($SR_storysId)->delete();
                                    SI_StorysImage::find($SI_StorysImageId)->delete();
                                    $storeStatus = false;
                                }
                            } else {
                                SR_Storys::find($SR_storysId)->delete();
                                $storeStatus = false;
                            }
                        } else {
                            $storeStatus = false;
                        }
                    }
                }
                if ($storeStatus) {
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
                            'message' => null,
                            'operationType' => $operationType
                        ]
                    ], 200);
                }
            }
        } else {
            return response()->json([
                'status' => [
                    'success' => false,
                    'message' => 'please login to your account before store story.',
                    'operationType' => $operationType
                ]
            ], 200);
        }
    }
    public function edit($id)
    {
        $this->middleware('auth:api');

        $operationType = 'edit story.';

        if (auth()->user()) {
            $SR_Storys = SR_Storys::find($id);
            if ($SR_Storys) {
                $SLI_StorysLinkedImage =  SLI_StorysLinkedImage::where('sli_sr_id', '=', $SR_Storys->id)->get();
                foreach ($SLI_StorysLinkedImage as $key => $value) {
                    $SI_StorysImage =  SI_StorysImage::find($value->sli_si_id);
                    $images[$key] = [
                        'id' => $SI_StorysImage->id,
                        'image' => $SI_StorysImage->si_image
                    ];
                }
                // Separate date and time
                $created_at = explode(" ", $SR_Storys->created_at);
                $updated_at = explode(" ", $SR_Storys->updated_at);

                $storys = [
                    'id' => $SR_Storys->id,
                    'title' => $SR_Storys->sr_title,
                    'description' => $SR_Storys->sr_description,
                    'abstract' => $SR_Storys->sr_abstract,
                    'story' => $SR_Storys->sr_story,
                    'images' => $images,
                    'created_at' => $this->changeDate($created_at[0]) . " " . $created_at[1],
                    'updated_at' => $this->changeDate($updated_at[0]) . " " . $updated_at[1]
                ];
                $profile = [
                    'id' => auth()->user()->id,
                    'name' => auth()->user()->name,
                    'image' => auth()->user()->image,
                ];
                return response()->json([
                    'status' => [
                        'success' => true,
                        'message' => null,
                        'operationType' => $operationType
                    ],
                    'storys' => $storys,
                    'profile' => $profile
                ],  200);
            } else {
                return response()->json([
                    'status' => [
                        'success' => false,
                        'message' => 'data not found',
                        'operationType' => $operationType
                    ]
                ],  200);
            }
        } else {
            return response()->json([
                'status' => [
                    'success' => false,
                    'message' => 'please login to your account before edit story.',
                    'operationType' => $operationType
                ]
            ], 200);
        }
    }
    public function update(Request $request, $id)
    {
        $this->middleware('auth:api');

        $operationType = 'update story.';
        $illustrationUpdateStatus = false;
        $coverImageUpdateStatus  = false;
        if (auth()->user()) {
            if (!$request->coverImage && !$request->illustration) {
                // Update information from the SR_Storys table by story id.
                $SR_Storys = SR_Storys::find($id)->update([
                    'sr_title' => $request->title,
                    'sr_description' => $request->description,
                    'sr_abstract' => $request->abstract,
                    'sr_story' => $request->story
                ]);
                if ($SR_Storys) {
                    return response()->json([
                        'status' => [
                            'success' => true,
                            'message' => 'update date success',
                            'operationType' => $operationType
                        ]
                    ], 200);
                } else {
                    return response()->json([
                        'status' => [
                            'success' => false,
                            'message' => 'update date unsuccess',
                            'operationType' => $operationType
                        ]
                    ], 200);
                }
            } else {
                // Get information from the SR_Storys table by story id.
                $getSR_Storys = SR_Storys::find($id);

                if ($request->coverImage) {
                    $coverImage = $request->coverImage;
                    $nameCoverImage =  $this->dateTime . '-' . rand() . '.' . explode('/', explode(':', substr($coverImage, 0, strpos($coverImage, ';')))[1])[1];
                    Image::make($coverImage)->resize(550, 550, function ($constraint) {
                        $constraint->aspectRatio();
                    })->save(public_path('assets/cover_image/') . $nameCoverImage);
                    $pastCoverImage = '/assets/cover_image/' . $nameCoverImage;
                    if (File::delete(public_path(str_replace($this->HOST, "",  $getSR_Storys->sr_coverImage)))) {
                        $SR_Storys = SR_Storys::find($id)->update([
                            'sr_title' => $request->title,
                            'sr_description' => $request->description,
                            'sr_abstract' => $request->abstract,
                            'sr_story' => $request->story,
                            'sr_coverImage' => $pastCoverImage,
                        ]);
                    }
                } else {
                    $SR_Storys = SR_Storys::find($id)->update([
                        'sr_title' => $request->title,
                        'sr_description' => $request->description,
                        'sr_abstract' => $request->abstract,
                        'sr_story' => $request->story
                    ]);
                }
                $SR_StorysStatus = ($SR_Storys ? true : false);
                $coverImageUpdateStatus = ($SR_StorysStatus ? true : false);
                if ($request->illustration) {
                    $illustration = $request->illustration;
                    $getSLI_StorysLinkedImage = SLI_StorysLinkedImage::where('sli_sr_id', $id)->get();
                    foreach ($getSLI_StorysLinkedImage as $key => $value) {
                        $image_id[$key] = SI_StorysImage::find($value->sli_si_id);
                    }
                    SLI_StorysLinkedImage::where('sli_sr_id', $id)->delete();
                    foreach ($illustration as $key => $value) {
                        $nameIllustration =  $this->dateTime . '-' . rand() . '.' . explode('/', explode(':', substr($value, 0, strpos($value, ';')))[1])[1];
                        Image::make($value)->resize(550, 550, function ($constraint) {
                            $constraint->aspectRatio();
                        })->save(public_path('assets/illustration/') . $nameIllustration);
                        $pastIllustration = '/assets/illustration/' . $nameIllustration;

                        $SI_StorysImageId = SI_StorysImage::insertGetId([
                            'si_image' => $pastIllustration,
                            'created_at' => $this->now,
                            'updated_at' => $this->now
                        ]);
                        if ($SI_StorysImageId) {
                            $SLI_StorysLinkedImage = SLI_StorysLinkedImage::insert([
                                'sli_si_id' => $SI_StorysImageId,
                                'sli_sr_id' => $id,
                                'created_at' => $this->now,
                                'updated_at' => $this->now
                            ]);

                            $SLI_StorysLinkedImageStatus = ($SLI_StorysLinkedImage ? true : false);
                        }
                    }
                    if ($SLI_StorysLinkedImageStatus) {
                        foreach ($image_id as $key => $value) {
                            SI_StorysImage::find($value->id)->delete();
                            if (File::delete(public_path(str_replace($this->HOST, "", $value->si_image)))) {
                                $illustrationUpdateStatus = true;
                            }
                        }
                    }
                }
                if ($coverImageUpdateStatus && $illustrationUpdateStatus) {
                    return response()->json([
                        'status' => [
                            'success' => true,
                            'message' => 'update date success',
                            'operationType' => $operationType
                        ]
                    ], 200);
                } else if ($coverImageUpdateStatus || $illustrationUpdateStatus) {
                    return response()->json([
                        'status' => [
                            'success' => true,
                            'message' => 'update date success',
                            'operationType' => $operationType
                        ]
                    ], 200);
                } else {
                    return response()->json([
                        'status' => [
                            'success' => false,
                            'message' => 'update date unsuccess',
                            'operationType' => $operationType
                        ]
                    ], 200);
                }
            }

            // Check the SR_Storys table update.
            // $SR_StorysStatus = ($SR_Storys ? true : false);

            // }

        } else {
            return response()->json([
                'status' => [
                    'success' => false,
                    'message' => 'please login to your account before update story.',
                    'operationType' => $operationType
                ]
            ], 200);
        }
    }
    public function destroy($id)
    {
        $this->middleware('auth:api');

        $operationType = 'destroy story.';

        if (auth()->user()) {
            $SR_Storys = SR_Storys::where('sr_userId', '=', auth()->user()->id)->find($id);

            if ($SR_Storys) {
                $SLI_StorysLinkedImage =  SLI_StorysLinkedImage::where('sli_sr_id', '=', $SR_Storys->id)->get();

                foreach ($SLI_StorysLinkedImage as $key => $value) {

                    $value->delete();
                    $SI_StorysImage[$key] =  SI_StorysImage::find($value->sli_si_id);
                    $SI_StorysImage[$key]->delete();
                }
                $CM_Comment = CM_Comment::where('cm_sr_id', '=', $id);
                $CM_Comment->delete();
                $SR_Storys->delete();
                if (File::delete(public_path(str_replace($this->HOST, "",  $SR_Storys->sr_coverImage)))) {
                    foreach ($SI_StorysImage as $key => $value) {
                        if (File::delete(public_path(str_replace($this->HOST, "", $value->si_image)))) {
                            $is_images_delete = true;
                        }
                    }
                    if ($is_images_delete) {
                        return response()->json([
                            'status' => [
                                'success' => true,
                                'message' => null,
                                'operationType' => $operationType
                            ]
                        ], 200);
                    }
                }
            } else {
                return response()->json([
                    'status' => [
                        'success' => false,
                        'message' => 'data not found',
                        'operationType' => $operationType
                    ]
                ], 200);
            }
        } else {
            return response()->json([
                'status' => [
                    'success' => false,
                    'message' => 'please login to your account before delete story.',
                    'operationType' => $operationType
                ]
            ], 200);
        }
    }
    public function like(Request $request)
    {
        $this->middleware('auth:api');
        $operationType = 'like story.';

        //dd($request->all(), auth()->user()->id);
        if (auth()->user()) {
            $validator = Validator::make($request->all(), [
                'like' => 'required',
                'story' => 'required'
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                return response()->json([
                    'status' => [
                        'success' => false,
                        'message' => $errors,
                        'operationType' => $operationType
                    ]
                ],  200);
            } else {
                $SL_StorysLike = SL_StorysLike::where('sl_userId', '=', auth()->user()->id)->where('sl_sr_id', '=', $request->story)->get();
                if (count($SL_StorysLike) > 0) {
                    $SL_StorysLike =  SL_StorysLike::where('sl_userId', '=', auth()->user()->id)->where('sl_sr_id', '=', $request->story)->update([
                        'sl_like' => $request->like,
                        'updated_at' => $this->now
                    ]);
                    if ($SL_StorysLike === 1) {
                        return response()->json([
                            'status' => [
                                'success' => true,
                                'message' => 'update status like success',
                                'operationType' => $operationType
                            ]
                        ],  200);
                    } else {
                        return response()->json([
                            'status' => [
                                'success' => false,
                                'message' => 'update status like unsuccess',
                                'operationType' => $operationType
                            ]
                        ],  200);
                    }
                } else {
                    $SL_StorysLike =  SL_StorysLike::insert([
                        'sl_like' => $request->like,
                        'sl_sr_id' => $request->story,
                        'sl_userId' => auth()->user()->id,
                        'created_at' => $this->now,
                        'updated_at' => $this->now
                    ]);
                    // dd($SL_StorysLike);
                    if ($SL_StorysLike === true) {
                        return response()->json([
                            'status' => [
                                'success' => true,
                                'message' => 'update status like success',
                                'operationType' => $operationType
                            ]
                        ],  200);
                    } else {
                        return response()->json([
                            'status' => [
                                'success' => false,
                                'message' => 'update status like unsuccess',
                                'operationType' => $operationType
                            ]
                        ],  200);
                    }
                }
            }
        } else {
            return response()->json([
                'status' => [
                    'success' => false,
                    'message' => 'please login to your account before store story.',
                    'operationType' => $operationType
                ]
            ], 200);
        }
    }
    public function audience(Request $request, $id)
    {
        $operationType = 'audience story.';
    }
}
