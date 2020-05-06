<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAbArticleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ab_article', function (Blueprint $table) {
            $table->id('id');
            $table->string('ab_name',80);
            $table->integer('ab_price');
            $table->string('ab_description',1000);
            $table->tinyInteger('ab_creator_id');
            $table->timestamp('ab_createdate');
        });
        Schema::table('ab_article', function (Blueprint $table){
            $table->foreign('ab_creator_id')->references('id')->on('ab_user')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ab_article');
    }
}
