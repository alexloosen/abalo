<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAbArticlecategoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ab_articlecategory', function (Blueprint $table) {
            $table->unsignedTinyInteger('id',true);
            $table->string('ab_name',100)->unique();
            $table->string('ab_description',1000)->nullable();
            $table->unsignedTinyInteger('ab_parent')->nullable();
        });

        Schema::table('ab_articlecategory', function (Blueprint $table){
            $table->foreign('ab_parent')->references('id')->on('ab_articlecategory');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ab_articlecategory');
    }
}
