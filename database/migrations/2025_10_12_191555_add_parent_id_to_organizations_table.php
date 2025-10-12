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
        Schema::table('organizations', function (Blueprint $table) {
            if (Schema::hasColumn('organizations', 'parent_id')) { return; }
            $table->unsignedBigInteger('parent_id')->nullable()->after('id');
            $table->foreign('parent_id')->references('id')->on('organizations')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('organizations', function (Blueprint $table) {
            if (!Schema::hasColumn('organizations', 'parent_id')) { return; }
            $table->dropForeign(['parent_id']);
            $table->dropColumn('parent_id');
        });
    }
};
