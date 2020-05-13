<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAbShoppingcartItemTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

    public function up()
    {
        Schema::create('ab_shoppingcart_item', function (Blueprint $table) {
            $table->unsignedTinyInteger('id',true);
            $table->tinyInteger('ab_shoppingcart_id');
            $table->tinyInteger('ab_article_id');
            $table->timestamp('ab_createdate');
        });
        Schema::table('ab_shoppingcart_item', function (Blueprint $table){
            $table->foreign('ab_shoppingcart_id')->references('id')->on('ab_shoppingcart')->cascadeOnDelete();
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
        Schema::dropIfExists('ab_shoppingcart_item');
    }
}
