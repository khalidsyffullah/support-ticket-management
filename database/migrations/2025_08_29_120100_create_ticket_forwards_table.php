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
        Schema::create('ticket_forwards', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('ticket_id');
            $table->unsignedInteger('from_department_id');
            $table->unsignedInteger('to_department_id');
            $table->unsignedInteger('forwarded_by_user_id');
            $table->string('status')->default('pending');
            $table->unsignedInteger('processed_by_user_id')->nullable();
            $table->timestamp('processed_at')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->timestamps();

            $table->foreign('ticket_id')->references('id')->on('tickets')->onDelete('cascade');
            $table->foreign('from_department_id')->references('id')->on('departments')->onDelete('cascade');
            $table->foreign('to_department_id')->references('id')->on('departments')->onDelete('cascade');
            $table->foreign('forwarded_by_user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('processed_by_user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ticket_forwards');
    }
};
