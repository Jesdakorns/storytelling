<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cm_comments', function (Blueprint $table) {
            $table->id();
            $table->text('cm_comment');
            $table->unsignedBigInteger('cm_sr_id');
            $table->foreign('cm_sr_id')->references('id')->on('sr_storys');
            $table->unsignedBigInteger('cm_userId');
            $table->foreign('cm_userId')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comments');
    }
}
