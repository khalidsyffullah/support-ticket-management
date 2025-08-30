<template>
    <div>
        <Head :title="title" />
        <div class="bg-white rounded-md shadow overflow-hidden">
            <div class="p-6">
                <h2 class="text-2xl font-bold">{{ title }}</h2>
                <div class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div class="bg-gray-100 p-4 rounded-md">
                        <h3 class="text-lg font-semibold">Total Tickets</h3>
                        <p class="text-3xl font-bold">{{ total_tickets }}</p>
                    </div>
                    <div class="bg-red-100 p-4 rounded-md">
                        <h3 class="text-lg font-semibold">Breached Tickets</h3>
                        <p class="text-3xl font-bold">{{ breached_tickets }}</p>
                    </div>
                    <div class="bg-green-100 p-4 rounded-md">
                        <h3 class="text-lg font-semibold">Completed Tickets</h3>
                        <p class="text-3xl font-bold">{{ completed_tickets }}</p>
                    </div>
                    <div class="bg-blue-100 p-4 rounded-md">
                        <h3 class="text-lg font-semibold">Avg. Resolution Time</h3>
                        <p class="text-3xl font-bold">{{ average_resolution_time }} min</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Head } from '@inertiajs/vue3';
import Layout from '@/Shared/Layout.vue';

export default {
    components: {
        Head,
    },
    layout: Layout,
    props: {
        title: String,
        total_tickets: Number,
        breached_tickets: Number,
        completed_tickets: Number,
        average_resolution_time: Number,
    },
};
</script>
