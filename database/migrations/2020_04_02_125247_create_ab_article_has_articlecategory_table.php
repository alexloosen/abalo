<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAbArticleHasArticlecategoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ab_article_has_articlecategory', function (Blueprint $table) {
            $table->unsignedTinyInteger('id',true);
            $table->tinyInteger('ab_articlecategory_id');
            $table->tinyInteger('ab_article_id');
            $table->unique(['ab_articlecategory_id', 'ab_article_id']);
        });
        Schema::table('ab_article_has_articlecategory', function(Blueprint $table) {
            $table->foreign('ab_articlecategory_id')->references('id')->on('ab_articlecategory')->cascadeOnDelete();
            $table->foreign('ab_article_id')->references('id')->on('ab_article')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ab_article_has_articlecategory');
    }
}
