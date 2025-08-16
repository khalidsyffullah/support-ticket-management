<template>
    <div>
        <Head :title="$t('Departmental Teams')" />
        <h1 class="mb-8 text-3xl font-bold">{{ $t('Departmental Teams') }}</h1>
        <div class="bg-white rounded-md shadow overflow-hidden">
            <div class="flex flex-wrap -mb-8 -mr-6 p-8">
                <div v-for="department in departments" :key="department.id" class="w-full max-w-sm p-4">
                    <div class="bg-gray-100 rounded-md p-4">
                        <h3 class="text-lg font-bold mb-2">{{ department.name }}</h3>
                        <p class="text-sm text-gray-600">{{ $t('Total Members') }}: {{ department.users_count }}</p>
                        <button @click="viewMembers(department)" class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">{{ $t('View Members') }}</button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="selectedDepartment" class="mt-8 bg-white rounded-md shadow overflow-hidden">
            <div class="flex justify-between items-center p-6">
                <h2 class="text-2xl font-bold">{{ selectedDepartment.name }} {{ $t('Members') }}</h2>
                <button @click="showAddMemberModal = true" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">{{ $t('Add New Team Member') }}</button>
            </div>
            <div class="p-6">
                <table class="w-full whitespace-no-wrap">
                    <thead>
                        <tr class="text-left font-bold">
                            <th class="pb-4 pt-6 px-6">{{ $t('Name') }}</th>
                            <th class="pb-4 pt-6 px-6">{{ $t('Email') }}</th>
                            <th class="pb-4 pt-6 px-6">{{ $t('Team Head') }}</th>
                            <th class="pb-4 pt-6 px-6">{{ $t('Actions') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="member in teamMembers" :key="member.id" class="hover:bg-gray-100 focus-within:bg-gray-100">
                            <td class="border-t py-4 px-6">{{ member.first_name }} {{ member.last_name }}</td>
                            <td class="border-t py-4 px-6">{{ member.email }}</td>
                            <td class="border-t py-4 px-6">
                                <label class="flex items-center">
                                    <input type="checkbox" :checked="member.pivot.team_head" @change="updateTeamHead(member, $event.target.checked)" class="form-checkbox h-5 w-5 text-indigo-600" />
                                </label>
                            </td>
                            <td class="border-t py-4 px-6">
                                <button @click="removeMember(member)" class="text-red-600 hover:underline">{{ $t('Remove') }}</button>
                            </td>
                        </tr>
                        <tr v-if="teamMembers.length === 0">
                            <td class="border-t px-6 py-4" colspan="4">{{ $t('No members found.') }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <Modal :show="showAddMemberModal" @close="showAddMemberModal = false">
            <div class="p-6">
                <h3 class="text-lg font-bold mb-4">{{ $t('Add Team Member') }}</h3>
                <div class="mb-4">
                    <label class="form-label">{{ $t('Search User') }}:</label>
                    <text-input v-model="searchQuery" placeholder="Search by name or email" />
                </div>
                <div class="mb-4">
                    <label class="form-label">{{ $t('Select User') }}:</label>
                    <select-input v-model="form.user_id" :error="form.errors.user_id">
                        <option :value="null">{{ $t('Select a user') }}</option>
                        <option v-for="user in filteredUsers" :key="user.id" :value="user.id">{{ user.first_name }} {{ user.last_name }} ({{ user.email }})</option>
                    </select-input>
                </div>
                <div class="flex justify-end">
                    <button @click="showAddMemberModal = false" class="btn-secondary mr-2">{{ $t('Cancel') }}</button>
                    <loading-button :loading="form.processing" @click="addMember" class="btn-primary">{{ $t('Add') }}</loading-button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import { Head } from '@inertiajs/vue3'
import Layout from '@/Shared/Layout.vue'
import Modal from '@/Shared/Modal.vue'
import SelectInput from '@/Shared/SelectInput.vue'
import LoadingButton from '@/Shared/LoadingButton.vue'
import axios from 'axios'

import TextInput from '@/Shared/TextInput.vue';

export default {
    components: {
        Head,
        Modal,
        SelectInput,
        LoadingButton,
        TextInput,
    },
    layout: Layout,
    props: {
        departments: Array,
    },
    data() {
        return {
            selectedDepartment: null,
            teamMembers: [],
            showAddMemberModal: false,
            availableUsers: [],
            searchQuery: '',
            form: this.$inertia.form({
                user_id: null,
                team_head: false,
            }),
        }
    },
    computed: {
        filteredUsers() {
            if (!this.searchQuery) {
                return this.availableUsers;
            }
            const query = this.searchQuery.toLowerCase();
            return this.availableUsers.filter(user => {
                const name = `${user.first_name} ${user.last_name}`.toLowerCase();
                const email = user.email.toLowerCase();
                return name.includes(query) || email.includes(query);
            });
        },
    },
    methods: {
        async viewMembers(department) {
            this.selectedDepartment = department
            const response = await axios.get(this.route('departmental_teams.members', department.id))
            this.teamMembers = response.data
        },
        async addMember() {
            if (!this.selectedDepartment) return
            await this.form.post(this.route('departmental_teams.add_member', this.selectedDepartment.id), {
                onSuccess: () => {
                    this.showAddMemberModal = false
                    this.form.reset()
                    this.viewMembers(this.selectedDepartment) // Refresh members list
                    this.$page.props.flash.success = 'Team member added successfully.' // Assuming you have a flash message system
                },
                onError: (errors) => {
                    console.error(errors)
                },
            })
        },
        async removeMember(member) {
            if (!confirm('Are you sure you want to remove this member?')) return
            await this.$inertia.delete(this.route('departmental_teams.remove_member', { department: this.selectedDepartment.id, user: member.id }), {
                onSuccess: () => {
                    this.viewMembers(this.selectedDepartment) // Refresh members list
                    this.$page.props.flash.success = 'Team member removed successfully.'
                },
                onError: (errors) => {
                    console.error(errors)
                },
            })
        },
        async fetchAvailableUsers() {
            const response = await axios.get(this.route('departmental_teams.users'))
            this.availableUsers = response.data
        },
        async updateTeamHead(member, isTeamHead) {
            await this.$inertia.put(this.route('departmental_teams.update_head', { department: this.selectedDepartment.id, user: member.id }), { team_head: isTeamHead }, {
                onSuccess: () => {
                    this.viewMembers(this.selectedDepartment) // Refresh members list
                    this.$page.props.flash.success = 'Team head updated successfully.'
                },
                onError: (errors) => {
                    console.error(errors)
                },
            })
        },
    },
    created() {
        this.fetchAvailableUsers()
    },
}
</script>