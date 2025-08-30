<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ticket_slas', function (Blueprint $table) {
            $table->integer('total_sla_time')->nullable()->after('breached_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ticket_slas', function (Blueprint $table) {
            $table->dropColumn('total_sla_time');
        });
    }
};