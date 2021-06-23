<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStorysLikeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sl_storys_like', function (Blueprint $table) {
            $table->id();
            $table->integer('sl_like')->default(0);
            $table->unsignedBigInteger('sl_sr_id');
            $table->foreign('sl_sr_id')->references('id')->on('sr_storys');
            $table->unsignedBigInteger('sl_userId');
            $table->foreign('sl_userId')->references('id')->on('users');
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
        Schema::dropIfExists('sl_storys_like');
    }
}
