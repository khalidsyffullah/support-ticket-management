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
        Schema::create('ticket_slas', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('ticket_id');
            $table->foreign('ticket_id')->references('id')->on('tickets')->onDelete('cascade');
            $table->timestamp('response_sla_starts_at')->nullable();
            $table->timestamp('response_sla_ends_at')->nullable();
            $table->timestamp('resolution_sla_starts_at')->nullable();
            $table->timestamp('resolution_sla_ends_at')->nullable();
            $table->boolean('is_paused')->default(false);
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
        Schema::dropIfExists('ticket_slas');
    }
};