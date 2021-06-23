<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SR_Storys extends Model
{
    protected $table = 'sr_storys';
    protected $fillable = ['id','sr_title','sr_description','sr_abstract','sr_story','sr_coverImage'];
}
