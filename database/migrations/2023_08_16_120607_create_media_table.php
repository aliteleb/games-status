<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('file');
            $table->string('alt')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->text('description')->nullable();
            $table->tinyInteger('status')->default(1);
            $table->string('mime');
            $table->string('type');
            $table->integer('file_size');
            $table->integer('height');
            $table->integer('width');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
