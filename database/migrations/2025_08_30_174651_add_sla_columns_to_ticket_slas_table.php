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
            $table->unsignedBigInteger('sla_id')->after('ticket_id');
            $table->foreign('sla_id')->references('id')->on('slas')->onDelete('cascade');
            $table->unsignedInteger('user_id')->after('sla_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('status')->default('active')->after('user_id');
            $table->timestamp('breached_at')->nullable()->after('is_paused');
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
            $table->dropForeign(['sla_id']);
            $table->dropColumn('sla_id');
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
            $table->dropColumn('status');
            $table->dropColumn('breached_at');
        });
    }
};