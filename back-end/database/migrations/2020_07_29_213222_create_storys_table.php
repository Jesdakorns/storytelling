<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStorysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sr_storys', function (Blueprint $table) {
            $table->id();
            $table->string('sr_title');
            $table->string('sr_description');
            $table->text('sr_abstract');
            $table->text('sr_story');
            $table->text('sr_coverImage');
            $table->unsignedBigInteger('sr_userId');
            $table->foreign('sr_userId')->references('id')->on('users');
            $table->integer('sr_sr_audience')->default(0);
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
        Schema::dropIfExists('storys');
    }
}
