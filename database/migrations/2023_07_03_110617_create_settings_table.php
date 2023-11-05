<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('label')->nullable();
            $table->string('placeholder')->nullable();
            $table->string('default')->nullable();
            $table->string('section');
            $table->string('type');
            $table->text('description')->nullable();
            $table->string('options')->nullable();
            $table->string('value')->nullable();
            $table->string('editor')->default('text');
            $table->integer('ordering')->nullable();
            $table->boolean('status')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
