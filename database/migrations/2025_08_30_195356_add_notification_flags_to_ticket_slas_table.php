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
            $table->timestamp('response_warning_sent_at')->nullable()->after('total_sla_time');
            $table->timestamp('resolution_warning_sent_at')->nullable()->after('response_warning_sent_at');
            $table->timestamp('breach_notification_sent_at')->nullable()->after('resolution_warning_sent_at');
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
            $table->dropColumn('response_warning_sent_at');
            $table->dropColumn('resolution_warning_sent_at');
            $table->dropColumn('breach_notification_sent_at');
        });
    }
};