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
        Schema::create('ticket_applied_slas', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('ticket_id');
            $table->unsignedBigInteger('sla_id')->nullable();
            $table->string('type');
            $table->unsignedInteger('department_id')->nullable();
            $table->unsignedInteger('user_id')->nullable();
            $table->dateTime('deadline');
            $table->string('status')->default('active');
            $table->boolean('is_70_percent_notified')->default(false);
            $table->boolean('is_breached_notified')->default(false);
            $table->dateTime('paused_at')->nullable();
            $table->dateTime('fulfilled_at')->nullable();
            $table->timestamps();

            $table->foreign('ticket_id')->references('id')->on('tickets')->onDelete('cascade');
            $table->foreign('sla_id')->references('id')->on('slas')->onDelete('set null');
            $table->foreign('department_id')->references('id')->on('departments')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ticket_applied_slas');
    }
};
