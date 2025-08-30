<template>
    <div>
        <Head :title="title" />
        <div class="bg-white rounded-md shadow overflow-hidden">
            <div class="p-6">
                <h2 class="text-2xl font-bold">SLA Policies</h2>
                <div class="mt-4">
                    <form @submit.prevent="createSla">
                        <div class="flex space-x-4">
                            <div class="w-1/3">
                                <select-input v-model="form.priority_id" :error="form.errors.priority_id" label="Priority">
                                    <option v-for="priority in priorities" :key="priority.id" :value="priority.id">{{ priority.name }}</option>
                                </select-input>
                            </div>
                            <div class="w-1/3">
                                <text-input v-model="form.response_time" :error="form.errors.response_time" label="Response Time (minutes)" />
                            </div>
                            <div class="w-1/3">
                                <text-input v-model="form.resolution_time" :error="form.errors.resolution_time" label="Resolution Time (minutes)" />
                            </div>
                        </div>
                        <div class="mt-4">
                            <loading-button :loading="form.processing" class="btn-indigo" type="submit">Create SLA</loading-button>
                        </div>
                    </form>
                </div>
                <div class="mt-6">
                    <table class="w-full whitespace-nowrap">
                        <tr class="text-left font-bold">
                            <th class="pb-4 pt-6 px-6">Priority</th>
                            <th class="pb-4 pt-6 px-6">Response Time</th>
                            <th class="pb-4 pt-6 px-6">Resolution Time</th>
                            <th class="pb-4 pt-6 px-6">Actions</th>
                        </tr>
                        <tr v-for="sla in slas" :key="sla.id" class="hover:bg-gray-100 focus-within:bg-gray-100">
                            <td class="border-t">
                                <div class="flex items-center px-6 py-4">
                                    {{ sla.priority.name }}
                                </div>
                            </td>
                            <td class="border-t">
                                <div class="flex items-center px-6 py-4">
                                    {{ sla.response_time }} minutes
                                </div>
                            </td>
                            <td class="border-t">
                                <div class="flex items-center px-6 py-4">
                                    {{ sla.resolution_time }} minutes
                                </div>
                            </td>
                            <td class="border-t">
                                <div class="flex items-center px-6 py-4">
                                    <button class="text-red-600 hover:underline" @click="deleteSla(sla)">Delete</button>
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
import TextInput from '@/Shared/TextInput.vue';
import SelectInput from '@/Shared/SelectInput.vue';
import LoadingButton from '@/Shared/LoadingButton.vue';

export default {
    components: {
        Head,
        Link,
        Layout,
        TextInput,
        SelectInput,
        LoadingButton,
    },
    layout: Layout,
    props: {
        title: String,
        slas: Array,
        priorities: Array,
    },
    data() {
        return {
            form: this.$inertia.form({
                priority_id: null,
                response_time: null,
                resolution_time: null,
            }),
        };
    },
    methods: {
        createSla() {
            this.form.post(this.route('sla.store'));
        },
        deleteSla(sla) {
            if (confirm('Are you sure you want to delete this SLA policy?')) {
                this.$inertia.delete(this.route('sla.destroy', sla.id));
            }
        },
    },
};
</script>
