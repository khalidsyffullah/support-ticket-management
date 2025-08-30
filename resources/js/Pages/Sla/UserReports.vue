<template>
    <div>
        <Head :title="title" />
        <div class="bg-white rounded-md shadow overflow-hidden">
            <div class="p-6">
                <h2 class="text-2xl font-bold">{{ title }}</h2>
                <div class="mt-6">
                    <table class="w-full whitespace-nowrap">
                        <tr class="text-left font-bold">
                            <th class="pb-4 pt-6 px-6">
                                <Link :href="getSortLink('name')" class="flex items-center">
                                    User
                                    <span v-if="sortBy === 'name'">
                                        <svg v-if="sortDirection === 'asc'" class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>
                                        <svg v-else class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </span>
                                </Link>
                            </th>
                            <th class="pb-4 pt-6 px-6">Role</th>
                            <th class="pb-4 pt-6 px-6">
                                <Link :href="getSortLink('assigned_tickets')" class="flex items-center">
                                    Assigned Tickets
                                    <span v-if="sortBy === 'assigned_tickets'">
                                        <svg v-if="sortDirection === 'asc'" class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>
                                        <svg v-else class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </span>
                                </Link>
                            </th>
                            <th class="pb-4 pt-6 px-6">
                                <Link :href="getSortLink('breached_tickets')" class="flex items-center">
                                    Breached Tickets
                                    <span v-if="sortBy === 'breached_tickets'">
                                        <svg v-if="sortDirection === 'asc'" class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>
                                        <svg v-else class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </span>
                                </Link>
                            </th>
                            <th class="pb-4 pt-6 px-6">
                                <Link :href="getSortLink('completed_tickets')" class="flex items-center">
                                    Completed Tickets
                                    <span v-if="sortBy === 'completed_tickets'">
                                        <svg v-if="sortDirection === 'asc'" class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>
                                        <svg v-else class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </span>
                                </Link>
                            </th>
                            <th class="pb-4 pt-6 px-6">
                                <Link :href="getSortLink('average_response_time')" class="flex items-center">
                                    Avg. Resolution Time (min)
                                    <span v-if="sortBy === 'average_response_time'">
                                        <svg v-if="sortDirection === 'asc'" class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>
                                        <svg v-else class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </span>
                                </Link>
                            </th>
                            <th class="pb-4 pt-6 px-6">Actions</th>
                        </tr>
                        <tr v-for="user in users" :key="user.id" class="hover:bg-gray-100 focus-within:bg-gray-100">
                            <td class="border-t">
                                <div class="flex items-center px-6 py-4">
                                    {{ user.name }}
                                </div>
                            </td>
                            <td class="border-t">
                                <div class="flex items-center px-6 py-4">
                                    {{ user.role }}
                                </div>
                            </td>
                            <td class="border-t">
                                <div class="flex items-center px-6 py-4">
                                    {{ user.assigned_tickets }}
                                </div>
                            </td>
                            <td class="border-t">
                                <div class="flex items-center px-6 py-4">
                                    {{ user.breached_tickets }}
                                </div>
                            </td>
                            <td class="border-t">
                                <div class="flex items-center px-6 py-4">
                                    {{ user.completed_tickets }}
                                </div>
                            </td>
                            <td class="border-t">
                                <div class="flex items-center px-6 py-4">
                                    {{ user.average_response_time }}
                                </div>
                            </td>
                            <td class="border-t">
                                <div class="flex items-center px-6 py-4">
                                    <Link :href="route('sla.reports.users.show', user.id)" class="flex items-center btn-indigo ml-auto">View</Link>
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
import { Head, Link } from '@inertiajs/vue3';
import Layout from '@/Shared/Layout.vue';

export default {
    components: {
        Head,
        Link,
    },
    layout: Layout,
    props: {
        title: String,
        users: Array,
        sortBy: {
            type: String,
            default: 'name',
        },
        sortDirection: {
            type: String,
            default: 'asc',
        },
    },
    methods: {
        getSortLink(column) {
            let direction = 'asc';
            if (this.sortBy === column && this.sortDirection === 'asc') {
                direction = 'desc';
            }
            return this.route('sla.reports.users', { sort_by: column, sort_direction: direction });
        },
    },
};
</script>
