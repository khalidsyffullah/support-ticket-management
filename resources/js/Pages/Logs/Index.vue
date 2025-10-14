<template>
    <div>
        <Head :title="$t(title)" />
        <div class="flex flex-col md:flex-row gap-3 mb-4 justify-between items-center">
            <div class="flex flex-col md:flex-row gap-2">
                <select v-model="form.limit" class="w-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block px-2 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="10">10</option>
                    <option value="25">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <div class="filter-add-new flex flex-col gap-3 md:flex-row items-center">
                <select-input v-model="form.user_id" :key="renderComponent" class="mr-2 w-full">
                    <option :value="null">{{ $t('User') }}</option>
                    <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
                </select-input>
                <select-input v-model="form.activity" :key="renderComponent" class="mr-2 w-full">
                    <option :value="null">{{ $t('Activity') }}</option>
                    <option v-for="activity in activities" :key="activity" :value="activity">{{ activity }}</option>
                </select-input>
                <input type="date" v-model="form.start_date" class="mr-2 w-full" />
                <input type="date" v-model="form.end_date" class="mr-2 w-full" />
            </div>
        </div>
        <div class="flex flex-wrap gap-2 mb-4" v-if="hasActiveFilters">
            <span v-for="(value, key) in activeFilters" :key="key" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {{ value }}
                <button type="button" @click="clearFilter(key)" class="flex-shrink-0 ml-1.5 inline-flex text-indigo-400 hover:text-indigo-500 focus:outline-none focus:text-indigo-500">
                    <span class="sr-only">Remove filter for {{ key }}</span>
                    <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                        <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
                    </svg>
                </button>
            </span>
            <button type="button" @click="resetAllFilters" class="btn bg-red-500 text-white p-2">{{ $t('Reset Filters') }}</button>
        </div>
        <!-- <div class="mb-4">
            <h3 class="text-lg font-medium">{{ $t('Delete Logs') }}</h3>
            <div class="flex items-center gap-4 mt-2">
                <div>
                    <select-input v-model="deleteForm.activity" class="w-full">
                        <option :value="null">{{ $t('Select Activity') }}</option>
                        <option v-for="activity in activities" :key="activity" :value="activity">{{ activity }}</option>
                    </select-input>
                    <button @click="deleteLogs('activity')" class="btn-danger mt-2">{{ $t('Delete by Activity') }}</button>
                </div>
                <div>
                    <input type="date" v-model="deleteForm.start_date" class="w-full" />
                    <input type="date" v-model="deleteForm.end_date" class="w-full mt-2" />
                    <button @click="deleteLogs('date')" class="btn-danger mt-2">{{ $t('Delete by Date Range') }}</button>
                </div>
            </div>
        </div> -->
        <div class="bg-white rounded-md shadow overflow-x-auto">
            <table class="min-w-full whitespace-nowrap">
                <thead>
                    <tr class="text-left font-bold">
                        <th class="px-6 pt-6 pb-4">{{ $t('User') }}</th>
                        <th class="px-6 pt-6 pb-4">{{ $t('Activity') }}</th>
                        <th class="px-6 pt-6 pb-4">{{ $t('Description') }}</th>
                        <th class="px-6 pt-6 pb-4">{{ $t('Date') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="log in logs.data" :key="log.id" class="hover:bg-gray-100 focus-within:bg-gray-100">
                        <td class="border-t px-6 py-4">
                            {{ log.user ? log.user.name : 'Guest' }}
                        </td>
                        <td class="border-t px-6 py-4">
                            {{ log.activity }}
                        </td>
                        <td class="border-t px-6 py-4">
                            {{ log.description }}
                        </td>
                        <td class="border-t px-6 py-4">
                            {{ moment(log.created_at).fromNow() }}
                        </td>
                    </tr>
                    <tr v-if="logs.data.length === 0">
                        <td class="border-t px-6 py-4" colspan="4">{{ $t('No logs found.') }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <pagination class="mt-4" :links="logs.links" />
    </div>
</template>

<script>
import { Head, Link } from '@inertiajs/vue3';
import Layout from '@/Shared/Layout.vue';
import Pagination from '@/Shared/Pagination.vue';
import SelectInput from '@/Shared/SelectInput.vue';
import throttle from 'lodash/throttle';
import pickBy from 'lodash/pickBy';
import mapValues from 'lodash/mapValues';
import moment from 'moment';

export default {
    metaInfo: { title: 'Activity Logs' },
    components: {
        Head,
        Link,
        Pagination,
        SelectInput,
    },
    layout: Layout,
    props: {
        title: String,
        logs: Object,
        filters: Object,
        users: Array,
        activities: Array,
    },
    data() {
        return {
            form: {
                user_id: this.filters.user_id ?? null,
                activity: this.filters.activity ?? null,
                limit: this.filters.limit ?? 10,
                start_date: this.filters.start_date ?? null,
                end_date: this.filters.end_date ?? null,
            },
            deleteForm: {
                activity: null,
                start_date: null,
                end_date: null,
            },
            renderComponent: 0,
        };
    },
    watch: {
        form: {
            deep: true,
            handler: throttle(function () {
                this.$inertia.get(this.route('activity_logs'), pickBy(this.form), { preserveState: true });
            }, 150),
        },
    },
    methods: {
        resetAllFilters() {
            this.form = mapValues(this.form, () => null);
            this.renderComponent += 1;
        },
        clearFilter(key) {
            this.form[key] = null;
        },
        deleteLogs(type) {
            if (confirm('Are you sure you want to delete these logs?')) {
                let data = {};
                if (type === 'activity') {
                    data.activity = this.deleteForm.activity;
                } else if (type === 'date') {
                    data.start_date = this.deleteForm.start_date;
                    data.end_date = this.deleteForm.end_date;
                }
                this.$inertia.delete(this.route('activity_logs.destroy'), { data });
            }
        },
    },
    computed: {
        hasActiveFilters() {
            return Object.keys(this.activeFilters).length > 0;
        },
        activeFilters() {
            const active = {};
            const filters = {
                user_id: this.form.user_id,
                activity: this.form.activity,
                start_date: this.form.start_date,
                end_date: this.form.end_date,
            };

            for (const key in filters) {
                const value = filters[key];
                if (value) {
                    let displayValue = value;
                    if (key === 'user_id') {
                        const user = this.users.find(u => u.id === value);
                        displayValue = user ? user.name : value;
                    }
                    active[key] = displayValue;
                }
            }
            return active;
        },
    },
    created() {
        this.moment = moment;
    }
};
</script>
