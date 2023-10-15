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
        Schema::table('games', function (Blueprint $table) {
            $table->decimal('meta_score')->nullable();
            $table->decimal('user_score')->nullable();
            $table->boolean('is_offline_act')->default(false)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('games', function (Blueprint $table) {
            $table->dropColumn('meta_score');
            $table->dropColumn('user_score');
            $table->dropColumn('is_offline_act');
        });
    }
};
