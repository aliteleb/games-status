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
        Schema::create('games', function (Blueprint $table) {
            $table->id();

            $table->string('type')->nullable()->default('game');
            $table->string('name');
            $table->string('slug');
            $table->text('description')->nullable();
            $table->string('image')->nullable();

            $table->integer('steam_appid')->unique()->nullable();
            $table->integer('gog_id')->unique()->nullable();

            $table->string('release_date')->nullable();
            $table->id('drm_protection_id');

            $table->integer('required_age')->nullable();
            $table->json('pc_requirements')->nullable();
            $table->json('developers')->nullable();
            $table->json('publishers')->nullable();
            $table->json('price_overview')->nullable();
            $table->json('platforms')->nullable();
            $table->json('metacritic')->nullable();
            $table->json('categories')->nullable();
            $table->text('notes')->nullable();

            $table->integer('game_status_id')->nullable();
            $table->boolean('status')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
