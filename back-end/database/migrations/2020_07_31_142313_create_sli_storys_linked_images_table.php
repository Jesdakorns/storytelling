<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSliStorysLinkedImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sli_storys_linked_images', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sli_sr_id');
            $table->foreign('sli_sr_id')->references('id')->on('sr_storys');
            $table->unsignedBigInteger('sli_si_id');
            $table->foreign('sli_si_id')->references('id')->on('si_storys_images');
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
        Schema::dropIfExists('sli_storys_linked_images');
    }
}
