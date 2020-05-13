<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAbShoppingcartTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

    public function up()
    {
        Schema::create('ab_shoppingcart', function (Blueprint $table) {
            $table->unsignedTinyInteger('id',true);
            $table->tinyInteger('ab_creator_id');
            $table->timestamp('ab_createdate');
        });
        Schema::table('ab_shoppingcart', function (Blueprint $table){
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
        Schema::dropIfExists('ab_shoppingcart');
    }
}
