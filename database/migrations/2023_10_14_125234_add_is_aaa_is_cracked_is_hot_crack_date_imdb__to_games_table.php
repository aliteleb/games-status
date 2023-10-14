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
            $table->string('imdb')->nullable()->after('gog_id');
            $table->string('crack_date')->nullable()->after('gog_id');
            $table->boolean('is_cracked')->nullable()->after('gog_id');
            $table->boolean('is_hot')->nullable()->after('gog_id');
            $table->boolean('is_aaa')->nullable()->after('gog_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('games', function (Blueprint $table) {
            $table->dropColumn('imdb');
            $table->dropColumn('crack_date');
            $table->dropColumn('is_cracked');
            $table->dropColumn('is_hot');
            $table->dropColumn('is_aaa');
        });
    }
};
