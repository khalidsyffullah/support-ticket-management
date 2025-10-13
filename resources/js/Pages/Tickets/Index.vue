<template>
    <div>
        <Head :title="$t(title)" />
        <div class="flex flex-col md:flex-row gap-3 mb-4 justify-between items-center ticket-filters">
            <div class="flex flex-col md:flex-row gap-2">
                <select v-model="form.limit" class="w-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block px-2 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="10">10</option>
                    <option value="25">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <label for="importCSV" class="uppercase gap-[1px] cursor-pointer text-sm px-3 py-1 flex items-center justify-center">
                    <img class="w-6 h-6" src="/images/svg/import-csv.svg" alt="Import CSV" />
                    <span>{{ $t('Import') }}</span>
                    <input @change="uploadImportCSV" class="hidden" id="importCSV" type="file" />
                </label>
                <a class="uppercase gap-[1px] cursor-cursor text-sm px-3 py-1 flex items-center justify-center" href="/dashboard/ticket/csv/export">
                    <img class="w-6 h-6" src="/images/svg/export-csv.svg" alt="Export CSV" />
                    <span>{{ $t('Export') }}</span>
                </a>
            </div>
            <div class="filter-add-new flex flex-col gap-3 md:flex-row items-center">
                <search-input v-model="form.search" placeholder="Search by Key, Subject, Priority, Status, Assign to..." class="w-full max-w-md search" @reset="reset"></search-input>

                <Link class="btn-indigo" :href="this.route('tickets.create')">
                    <span>{{ $t('New Ticket') }}</span>
                </Link>
            </div>
        </div>
        <div class="flex flex-col gap-3 mb-4 md:flex-row w-full items-center ticket-filters">
            <div class="mr-2 w-full">{{ $t('Filter Ticket By') }}:</div>
            <select-input v-if="!(hidden_fields && hidden_fields.includes('ticket_type'))" v-model="form.type_id" :key="renderComponent" class="mr-2 w-full">
                <option :value="null">{{ $t('Type') }}</option>
                <option v-for="s in types" :key="s.id" :value="s.id">{{ s.name }}</option>
            </select-input>
            <select-input v-if="!(hidden_fields && hidden_fields.includes('category'))" v-model="form.category_id" :key="renderComponent" class="mr-2 w-full">
                <option :value="null">{{ $t('Category') }}</option>
                <option v-for="s in categories" :key="s.id" :value="s.id">{{ s.name }}</option>
            </select-input>
            <select-input v-if="!(hidden_fields && hidden_fields.includes('department'))" v-model="form.department_id" :key="renderComponent" class="mr-2 w-full">
                <option :value="null">{{ $t('Department') }}</option>
                <option v-for="s in departments" :key="s.id" :value="s.id">{{ s.name }}</option>
            </select-input>
            <select-input v-model="form.organization_id" :key="renderComponent" class="mr-2 w-full">
                <option :value="null">{{ $t('Organization') }}</option>
                <optgroup v-for="org in organizations" :key="org.id" :label="org.name">
                    <option :value="org.id">{{ org.name }}</option>
                    <option v-for="child in org.children" :key="child.id" :value="child.id">
                        &nbsp;&nbsp;&nbsp;{{ child.name }}
                    </option>
                </optgroup>
            </select-input>
            <select-input v-model="form.assigned_by" :key="renderComponent" class="mr-2 w-full">
                <option :value="null">{{ $t('Assigned By') }}</option>
                <option v-for="assignee in assignees" :key="assignee.id" :value="assignee.id">{{ assignee.name }}</option>
            </select-input>
            <select-input v-model="form.priority_id" :key="renderComponent" class="mr-2 w-full">
                <option :value="null">{{ $t('Priority') }}</option>
                <option v-for="s in priorities" :key="s.id" :value="s.id">{{ s.name }}</option>
            </select-input>
            <select-input v-model="form.status_id" :key="renderComponent" class="mr-2 w-full">
                <option :value="null">{{ $t('Status') }}</option>
                <option v-for="s in statuses" :key="s.id" :value="s.id">{{ s.name }}</option>
            </select-input>
            <select-input-filter :placeholder="$t('Assign To')" :onInput="doFilter" @focus="doFilter" :items="assignees"
                                 v-if="!(hidden_fields && hidden_fields.includes('assigned_to')) && user_access.ticket.update"
                                 v-model="form.assigned_to" :key="renderComponent" class="w-full">
            </select-input-filter>
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
        <div class="bg-white rounded-md shadow overflow-x-auto">
            <table class="min-w-full whitespace-nowrap ticket_list">
                <tbody>
                <tr class="text-left font-bold">
                    <th v-for="(h, i) in headers" :key="i">
                        <span :class="headerClass(h)">{{ $t(h.name) }}
                            <span v-if="h.sort" class="icons">
                                <icon class="fill-gray-300" :class="{'fill-gray-800': (form.direction === 'desc' && form.field === h.value)}" name="up" @click="sort(h.value)" />
                                <icon class="fill-gray-300" :class="{'fill-gray-800': form.direction === 'asc' && form.field === h.value}" name="down" @click="sort(h.value)" />
                            </span>
                        </span>
                    </th>
                </tr>
                <tr v-for="ticket in tickets.data" :key="ticket.id" class="hover:bg-gray-100 focus-within:bg-gray-100" :class="{'bg-gray-300 font-bold': ticket.has_unread_comments}">
                    <td class="border-t">
                        <Link class="flex items-center px-6 py-4 focus:text-indigo-500" :href="route('tickets.edit', ticket.uid || ticket.id)">
                            #{{ ticket.uid }}
                        </Link>
                    </td>
                    <td class="border-t">
                        <Link class="s__details flex flex-col" :href="route('tickets.edit', ticket.uid || ticket.id)">
                            <span class="subject_t">{{ ticket.subject }}</span>
                            <span class="user__d flex text-xs items-center pt-1">
                                <span v-if="ticket.user" class="user__n flex items-center pr-4" title="Client">
                                    <icon name="user" class="flex-shrink-0 h-3 fill-gray-400 pr-1" />
                                    {{ ticket.user }}
                                </span>
                                <span v-if="ticket.assigned_to" class="user__n flex items-center pr-4" title="Assignee">
                                    <icon name="user-check" class="flex-shrink-0 h-3 fill-gray-400 pr-1" />
                                    {{ ticket.assigned_to }}
                                </span>
                            </span>
                        </Link>
                    </td>
                    <td class="border-t">
                        <Link class="flex items-center px-6 py-4 focus:text-indigo-500" :href="route('tickets.edit', ticket.uid || ticket.id)">
                            {{ ticket.priority }}
                        </Link>
                    </td>
                    <td class="border-t">
                        <Link class="flex items-center px-6 py-4 focus:text-indigo-500" :href="route('tickets.edit', ticket.uid || ticket.id)">
                            <span :class="getStatusColor(ticket.status_slug)" class="px-2 py-1 rounded-full text-xs">{{ ticket.status }}</span>
                        </Link>
                    </td>
                    <td class="border-t">
                        <Link class="flex items-center px-6 py-4 focus:text-indigo-500" :href="route('tickets.edit', ticket.uid || ticket.id)">
                            {{ $t('error') === 'error' ? moment(ticket.created_at).fromNow() : moment(ticket.created_at).locale('zh-tw').fromNow() }}
                        </Link>
                    </td>
                    <td class="border-t">
                        <Link class="flex items-center px-6 py-4 focus:text-indigo-500" :href="route('tickets.edit', ticket.uid || ticket.id)">
                            {{ $t('error') === 'error' ? moment(ticket.updated_at).fromNow() : moment(ticket.updated_at).locale('zh-tw').fromNow() }}
                        </Link>
                    </td>
                </tr>
                <tr v-if="tickets.data.length === 0">
                    <td class="border-t px-6 py-4" colspan="6">{{ $t('No ticket found.') }}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <pagination class="mt-4" :links="tickets.links" />
    </div>
</template>

<script>
import { Link, Head } from '@inertiajs/vue3'
import Icon from '@/Shared/Icon.vue'
import pickBy from 'lodash/pickBy'
import Layout from '@/Shared/Layout.vue'
import throttle from 'lodash/throttle'
import mapValues from 'lodash/mapValues'
import Pagination from '@/Shared/Pagination.vue'
import SelectInput from '@/Shared/SelectInput.vue'
import SearchInput from '@/Shared/SearchInput.vue'
import SelectInputFilter from '@/Shared/SelectInputFilter.vue'
import moment from 'moment'
import axios from 'axios'

export default {
    metaInfo: { title: 'Tickets' },
    components: {
        SearchInput,
        Icon,
        Link,
        Head,
        Pagination,
        SelectInputFilter,
        SelectInput,
    },
    layout: Layout,
    props: {
        filters: Object,
        tickets: Object,
        assignees: Array,
        auth: Object,
        title: String,
        priorities: Array,
        statuses: Array,
        types: Array,
        categories: Array,
        departments: Array,
        hidden_fields: Object,
        organizations: Array,
    },
    remember: 'form',
    data() {
        return {
            headers: [
                {name: 'Key', value: 'id', sort: true},
                {name: 'Subject', value: 'subject', sort: true},
                {name: 'Priority', value: 'priority_id', sort: true},
                {name: 'Status', value: 'status_id', sort: true},
                {name: 'Date', value: 'created_at', sort: true},
                {name: 'Updated', value: 'updated_at', sort: true},
            ],
            user_access: this.$page.props.auth.user.access,
            form: {
                search: this.filters.search ?? null,
                limit: this.filters.limit ?? 10,
                field: this.filters.field ?? null,
                direction: this.filters.direction ?? null,
                priority_id: this.filters.priority_id ?? null,
                status_id: this.filters.status_id ?? null,
                type_id: this.filters.type_id ?? null,
                category_id: this.filters.category_id ?? null,
                department_id: this.filters.department_id ?? null,
                organization_id: this.filters.organization_id ?? null,
                assigned_by: this.filters.assigned_by ?? null,
                assigned_to: this.filters.assigned_to ?? null,
            },
            renderComponent: 0,
        }
    },
    watch: {
        form: {
            deep: true,
            handler: throttle(function() {
                this.$inertia.get(this.route('tickets'), pickBy(this.form), { replace: true, preserveState: true })
            }, 150),
        },
    },
    methods: {
        doFilter(e){
            axios.get(this.route('filter.assignees', {search: e.target.value})).then((res)=>{
                this.assignees.splice(0, this.assignees.length, ...res.data);
            })
        },
        sort(field) {
            this.form.field = field;
            this.form.direction = this.form.direction === 'asc' ? 'desc' : 'asc';
        },
        reset() {
            this.form = mapValues(this.form, () => null)
        },
        clearFilter(key) {
            this.form[key] = null;
            this.renderComponent += 1;
        },
        resetAllFilters() {
            this.form = mapValues(this.form, () => null);
            this.renderComponent += 1;
        },
        uploadImportCSV(e){
            if(e.target.files.length){
                this.$inertia.form({file: e.target.files[0]}).post(this.route('ticket.csv.import'))
            }
        },
        getStatusColor(slug) {
            const colors = {
                pending: 'bg-yellow-400',
                closed: 'bg-red-400',
                completed: 'bg-green-400',
                'delay_processing': 'bg-blue-200',
                processing: 'bg-indigo-300',
                'waiting_for_confirmation': 'bg-purple-200',
            };
            return colors[slug] || 'bg-gray-200';
        },
        headerClass(h) {
            return {
                'sort': h.sort,
                'active': this.form.field === h.value,
            };
        },
    },
    computed: {
        hasActiveFilters() {
            return Object.keys(this.activeFilters).length > 0;
        },
        activeFilters() {
            const active = {};
            const filters = {
                search: this.form.search,
                type_id: this.form.type_id,
                category_id: this.form.category_id,
                department_id: this.form.department_id,
                organization_id: this.form.organization_id,
                assigned_by: this.form.assigned_by,
                priority_id: this.form.priority_id,
                status_id: this.form.status_id,
                assigned_to: this.form.assigned_to,
            };

            for (const key in filters) {
                const value = filters[key];
                if (value) {
                    let displayValue = value;
                    const numValue = (key !== 'search') ? Number(value) : value;

                    // Map IDs to names for display
                    if (key === 'priority_id') {
                        const priority = this.priorities.find(p => p.id === numValue);
                        displayValue = priority ? priority.name : value;
                    } else if (key === 'status_id') {
                        const status = this.statuses.find(s => s.id === numValue);
                        displayValue = status ? status.name : value;
                    } else if (key === 'type_id') {
                        const type = this.types.find(t => t.id === numValue);
                        displayValue = type ? type.name : value;
                    } else if (key === 'category_id') {
                        const category = this.categories.find(c => c.id === numValue);
                        displayValue = category ? category.name : value;
                    } else if (key === 'department_id') {
                        const department = this.departments.find(d => d.id === numValue);
                        displayValue = department ? department.name : value;
                    } else if (key === 'organization_id') {
                        let organization = null;
                        for (const org of this.organizations) {
                            if (org.id === numValue) {
                                organization = org;
                                break;
                            }
                            if (org.children) {
                                const child = org.children.find(c => c.id === numValue);
                                if (child) {
                                    organization = child;
                                    break;
                                }
                            }
                        }
                        displayValue = organization ? organization.name : value;
                    } else if (key === 'assigned_by' || key === 'assigned_to') {
                        const assignee = this.assignees.find(a => a.id === numValue);
                        displayValue = assignee ? assignee.name : value;
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
}
</script>
