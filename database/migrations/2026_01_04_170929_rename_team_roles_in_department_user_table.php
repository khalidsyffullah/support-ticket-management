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
        Schema::table('department_user', function (Blueprint $table) {
            $table->renameColumn('team_head', 'team_manager');
            $table->renameColumn('team_managers', 'team_lead');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('department_user', function (Blueprint $table) {
            $table->renameColumn('team_manager', 'team_head');
            $table->renameColumn('team_lead', 'team_managers');
        });
    }
};