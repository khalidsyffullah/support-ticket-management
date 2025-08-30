<template>
    <div>
        <Head :title="title" />
        <div class="bg-white rounded-md shadow overflow-hidden">
            <div class="p-6">
                <h2 class="text-2xl font-bold">{{ title }}</h2>
                <div class="mt-6">
                    <table class="w-full whitespace-nowrap">
                        <tr class="text-left font-bold">
                            <th class="pb-4 pt-6 px-6">Ticket UID</th>
                            <th class="pb-4 pt-6 px-6">Subject</th>
                            <th class="pb-4 pt-6 px-6">Priority</th>
                            <th class="pb-4 pt-6 px-6">Status</th>
                            <th class="pb-4 pt-6 px-6">Assigned At</th>
                            <th class="pb-4 pt-6 px-6">Completed At</th>
                            <th class="pb-4 pt-6 px-6">Total SLA Time (min)</th>
                            <th class="pb-4 pt-6 px-6">Breached At</th>
                        </tr>
                        <tr v-for="ticketSla in ticketSlas" :key="ticketSla.id" class="hover:bg-gray-100 focus-within:bg-gray-100">
                            <td class="border-t">
                                <div class="flex items-center px-6 py-4">
                                    {{ ticketSla.ticket_uid }}
                                </div>
                            </td>
                            <td class="border-t">
                                <div class="flex items-center px-6 py-4">
                                    {{ ticketSla.ticket_subject }}
                                </div>
                            </td>
                            <td class="border-t">
                                <div class="flex items-center px-6 py-4">
                                    {{ ticketSla.priority }}
                                </div>
                            </td>
                            <td class="border-t">
                                <div class="flex items-center px-6 py-4">
                                    {{ ticketSla.status }}
                                </div>
                            </td>
                            <td class="border-t">
                                <div class="flex items-center px-6 py-4">
                                    {{ ticketSla.response_sla_starts_at }}
                                </div>
                            </td>
                            <td class="border-t">
                                <div class="flex items-center px-6 py-4">
                                    {{ ticketSla.resolution_sla_ends_at }}
                                </div>
                            </td>
                            <td class="border-t">
                                <div class="flex items-center px-6 py-4">
                                    {{ ticketSla.total_sla_time }}
                                </div>
                            </td>
                            <td class="border-t">
                                <div class="flex items-center px-6 py-4">
                                    {{ ticketSla.breached_at }}
                                </div>
                            </td>
                        </tr>
                    </table>
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
        user: Object,
        ticketSlas: Array,
    },
};
</script>
