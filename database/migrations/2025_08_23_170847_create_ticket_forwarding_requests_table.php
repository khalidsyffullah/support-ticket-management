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
        Schema::dropIfExists('ticket_forwarding_requests');
        Schema::create('ticket_forwarding_requests', function (Blueprint $table) {
            $table->id();
            $table->integer('ticket_id')->unsigned();
            $table->foreign('ticket_id')->references('id')->on('tickets')->onDelete('cascade');
            $table->integer('old_department_id')->unsigned();
            $table->foreign('old_department_id')->references('id')->on('departments')->onDelete('cascade');
            $table->integer('new_department_id')->unsigned();
            $table->foreign('new_department_id')->references('id')->on('departments')->onDelete('cascade');
            $table->integer('requested_by')->unsigned();
            $table->foreign('requested_by')->references('id')->on('users')->onDelete('cascade');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->integer('processed_by')->unsigned()->nullable();
            $table->foreign('processed_by')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ticket_forwarding_requests');
    }
};
