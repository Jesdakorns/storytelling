<?php

namespace App\Http\Controllers\Story;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DateTime;

use App\CM_Comment;
use App\User;

class CommentController extends Controller
{
    public function __construct(Request $request)
    {
        // $this->middleware('auth:api');
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
    public function index()
    {
        //
    }
    public function show($id)
    {
        $operationType = 'show comment.';
        $CM_Comment = CM_Comment::where('cm_sr_id', '=', $id)->get();
        // dd($CM_Comment);
       
        if(count($CM_Comment) > 0){
            foreach ($CM_Comment as $CM_Comment) {
                $User = User::find($CM_Comment->cm_userId);
    
                $comment[] = [
                    'message' => $CM_Comment,
                    'user' => $User
                ];
            }
            return response()->json([
                'status' => [
                    'success' => true,
                    'message' => null,
                    'operationType' => $operationType
                ],
                'comment' =>  $comment], 200);
        }else{
            return response()->json([
                'status' => [
                    'success' => true,
                    'message' => 'data not found',
                    'operationType' => $operationType
                ],
                'comment' => []
            ], 200);
        }
     
    }
    public function store(Request $request)
    {
        $this->middleware('auth:api');
        $operationType = 'store comment.';
        $commentId = CM_Comment::insertGetId([
            'cm_comment' => $request->comment,
            'cm_sr_id' => $request->storyId,
            'cm_userId' => auth()->user()->id,
            'created_at' => $this->now,
            'updated_at' => $this->now
        ]);
        $getUser = User::find(auth()->user()->id);
        $getCM_Comment =  CM_Comment::find($commentId);
        $created_at = explode(" ", $getCM_Comment->created_at);
        $updated_at = explode(" ", $getCM_Comment->updated_at);
        $comment = [
            'id' => $getCM_Comment->id,
            'comment' => $getCM_Comment->cm_comment,
            'storyId' => $getCM_Comment->cm_sr_id,
            'created_at' => $this->changeDate($created_at[0]) . " " . $created_at[1],
            'updated_at' => $this->changeDate($updated_at[0]) . " " . $updated_at[1]
        ];
        $user = [
            'id' => $getUser->id,
            'image' => $getUser->image,
            'name' => $getUser->name,
        ];
        if ($commentId) {
            return response()->json(['status' => 'successfully', 'comment' =>  $comment, 'user' => $user, 'operationType' => $operationType], 200);
        } else {
            return response()->json(['status' => 'unsuccessfully', 'message' => 'failed to save data to the database.', 'operationType' =>  $operationType], 200);
        }
    }
}
