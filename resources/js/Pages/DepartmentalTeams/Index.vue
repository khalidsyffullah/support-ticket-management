<template>
    <div class="min-h-screen bg-gray-50 py-8">
        <Head :title="$t('Departmental Teams')" />

        <!-- Header -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="mb-8">
                <h1 class="text-4xl font-bold text-gray-900">{{ $t('Departmental Teams') }}</h1>
                <p class="mt-2 text-lg text-gray-600">{{ $t('Manage your organizational departments and team members') }}</p>
            </div>

            <!-- Departments Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                <div v-for="department in departments" :key="department.id"
                     class="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-indigo-300">
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-4">
                            <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div class="text-right">
                                <div class="text-2xl font-bold text-indigo-600">{{ department.users_count }}</div>
                                <div class="text-xs text-gray-500 uppercase tracking-wide">{{ $t('Members') }}</div>
                            </div>
                        </div>

                        <h3 class="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                            {{ department.name }}
                        </h3>

                        <button @click="viewMembers(department)"
                                class="w-full mt-4 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 font-medium shadow-md hover:shadow-lg">
                            {{ $t('View Members') }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Selected Department Members -->
            <div v-if="selectedDepartment" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <!-- Header -->
                <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div class="mb-4 sm:mb-0">
                            <h2 class="text-2xl font-bold text-white">{{ selectedDepartment.name }}</h2>
                            <p class="text-indigo-100 mt-1">{{ $t('Team Members Management') }}</p>
                        </div>
                        <button @click="showAddMemberModal = true"
                                class="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-50 font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            {{ $t('Add New Team Member') }}
                        </button>
                    </div>
                </div>

                <!-- Members Table -->
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{{ $t('Member') }}</th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{{ $t('Email') }}</th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{{ $t('Team Head') }}</th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{{ $t('Actions') }}</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="member in teamMembers" :key="member.id"
                                class="hover:bg-gray-50 transition-colors duration-150">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 h-10 w-10">
                                            <div class="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                                <span class="text-white font-medium text-sm">
                                                    {{ member.first_name.charAt(0) }}{{ member.last_name.charAt(0) }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900">
                                                {{ member.first_name }} {{ member.last_name }}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-600">{{ member.email }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <label class="flex items-center cursor-pointer">
                                        <input type="checkbox"
                                               :checked="member.pivot.team_head"
                                               @change="updateTeamHead(member, $event.target.checked)"
                                               class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors" />
                                        <span class="ml-2 text-sm text-gray-700">{{ member.pivot.team_head ? $t('Yes') : $t('No') }}</span>
                                    </label>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button @click="removeMember(member)"
                                            class="inline-flex items-center px-3 py-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors duration-150">
                                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        {{ $t('Remove') }}
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="teamMembers.length === 0">
                                <td colspan="4" class="px-6 py-12 text-center">
                                    <div class="flex flex-col items-center">
                                        <svg class="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <h3 class="text-lg font-medium text-gray-900 mb-1">{{ $t('No team members') }}</h3>
                                        <p class="text-gray-500">{{ $t('Get started by adding your first team member.') }}</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Add Member Modal -->
        <Modal :show="showAddMemberModal" @close="closeAddMemberModal">
            <div class="bg-white ">
                <!-- Modal Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 class="text-xl font-semibold text-gray-900">{{ $t('Add Team Member') }}</h3>
                    <button @click="closeAddMemberModal"
                            class="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Modal Body -->
                <div class="p-6">
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('Select User') }}</label>
                        <div class="relative" ref="dropdownContainer">
                            <!-- Custom Dropdown -->
                            <button @click.stop="toggleDropdown"
                                    type="button"
                                    class="relative w-full bg-white border border-gray-300 rounded-lg shadow-sm pl-3 pr-10 py-3 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all min-h-[48px]"
                                    :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': form.errors.user_ids }">

                                <!-- Selected Users Display -->
                                <div v-if="selectedUsers.length > 0" class="flex flex-wrap gap-1">
                                    <span v-for="user in selectedUsers" :key="user.id"
                                          class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800">
                                        {{ user.first_name }} {{ user.last_name }}
                                        <button @click.stop="removeSelectedUser(user)"
                                                class="ml-1 inline-flex items-center justify-center w-4 h-4 text-indigo-400 hover:text-indigo-600">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </span>
                                </div>

                                <!-- Placeholder text -->
                                <span v-else class="block truncate text-gray-500">
                                    {{ $t('Select users') }}
                                </span>

                                <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <svg class="h-5 w-5 text-gray-400 transition-transform"
                                         :class="{ 'rotate-180': showDropdown }"
                                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </button>

                            <!-- Dropdown Panel -->
                            <div v-show="showDropdown"
                                 @click.stop
                                 class="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
                                <!-- Search Input -->
                                <div class="sticky top-0 bg-white p-2 border-b border-gray-200">
                                    <div class="relative">
                                        <input v-model="searchQuery"
                                               ref="searchInput"
                                               type="text"
                                               :placeholder="$t('Search by name or email...')"
                                               class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                                               @click.stop
                                               @input="onSearchInput">
                                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <!-- User Options -->
                                <div v-if="filteredUsers.length === 0" class="px-4 py-3 text-sm text-gray-500 text-center">
                                    {{ searchQuery ? $t('No users found matching your search') : $t('No users available') }}
                                </div>

                                <div v-for="user in filteredUsers"
                                     :key="user.id"
                                     @click="toggleUserSelection(user)"
                                     class="w-full text-left px-4 py-3 text-sm hover:bg-indigo-50 focus:bg-indigo-50 focus:outline-none transition-colors cursor-pointer border-l-4"
                                     :class="isUserSelected(user) ? 'bg-indigo-50 border-indigo-500' : 'border-transparent'">
                                    <div class="flex items-center">
                                        <!-- Checkbox -->
                                        <div class="flex-shrink-0 mr-3">
                                            <div class="w-4 h-4 border-2 rounded transition-all"
                                                 :class="isUserSelected(user) ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'">
                                                <svg v-if="isUserSelected(user)" class="w-3 h-3 text-white ml-0.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div class="flex-shrink-0 h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                                            <span class="text-white text-xs font-medium">
                                                {{ user.first_name.charAt(0) }}{{ user.last_name.charAt(0) }}
                                            </span>
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate">
                                                {{ user.first_name }} {{ user.last_name }}
                                            </p>
                                            <p class="text-sm text-gray-500 truncate">{{ user.email }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="form.errors.user_ids" class="mt-1 text-sm text-red-600">
                            {{ form.errors.user_ids }}
                        </div>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                    <button @click="closeAddMemberModal"
                            type="button"
                            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                        {{ $t('Cancel') }}
                    </button>
                    <loading-button :loading="form.processing"
                                    :disabled="selectedUsers.length === 0"
                                    @click="addMember"
                                    class="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all shadow-md">
                        {{ selectedUsers.length > 0 ? $t(`Add ${selectedUsers.length} Member(s)`) : $t('Add Members') }}
                    </loading-button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import { Head } from '@inertiajs/vue3'
import Layout from '@/Shared/Layout.vue'
import Modal from '@/Shared/Modal.vue'
import LoadingButton from '@/Shared/LoadingButton.vue'
import axios from 'axios'

export default {
    components: {
        Head,
        Modal,
        LoadingButton,
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
            showDropdown: false,
            availableUsers: [],
            searchQuery: '',
            selectedUsers: [],
            form: this.$inertia.form({
                user_ids: [],
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

        toggleDropdown() {
            this.showDropdown = !this.showDropdown
            if (this.showDropdown) {
                // Focus search input when dropdown opens
                this.$nextTick(() => {
                    if (this.$refs.searchInput) {
                        this.$refs.searchInput.focus()
                    }
                })
            }
        },

        toggleUserSelection(user) {
            const index = this.selectedUsers.findIndex(u => u.id === user.id)
            if (index > -1) {
                // Remove user if already selected
                this.selectedUsers.splice(index, 1)
            } else {
                // Add user if not selected
                this.selectedUsers.push(user)
            }
            // Update form data
            this.form.user_ids = this.selectedUsers.map(u => u.id)
        },

        removeSelectedUser(user) {
            const index = this.selectedUsers.findIndex(u => u.id === user.id)
            if (index > -1) {
                this.selectedUsers.splice(index, 1)
                this.form.user_ids = this.selectedUsers.map(u => u.id)
            }
        },

        isUserSelected(user) {
            return this.selectedUsers.some(u => u.id === user.id)
        },

        selectUser(user) {
            this.selectedUser = user
            this.form.user_id = user.id
            this.showDropdown = false
            this.searchQuery = ''
        },

        closeAddMemberModal() {
            this.showAddMemberModal = false
            this.showDropdown = false
            this.selectedUsers = []
            this.searchQuery = ''
            this.form.reset()
        },

        onSearchInput() {
            // Keep dropdown open while searching
            if (!this.showDropdown) {
                this.showDropdown = true
            }
        },

        handleClickOutside(event) {
            // Check if click is outside the dropdown container
            if (this.$refs.dropdownContainer && !this.$refs.dropdownContainer.contains(event.target)) {
                this.showDropdown = false
            }
        },

        async addMember() {
            if (!this.selectedDepartment || this.selectedUsers.length === 0) return
            await this.form.post(this.route('departmental_teams.add_member', this.selectedDepartment.id), {
                onSuccess: () => {
                    this.closeAddMemberModal()
                    this.viewMembers(this.selectedDepartment)
                    this.$page.props.flash.success = `${this.selectedUsers.length} team member(s) added successfully.`
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
                    this.viewMembers(this.selectedDepartment)
                    this.$page.props.flash.success = 'Team member removed successfully.'
                },
                onError: (errors) => {
                    console.error(errors)
                },
            })
        },

        async fetchAvailableUsers() {
            try {
                const response = await axios.get(this.route('departmental_teams.users'))
                this.availableUsers = response.data
            } catch (error) {
                console.error('Error fetching users:', error)
            }
        },

        async updateTeamHead(member, isTeamHead) {
            await this.$inertia.put(this.route('departmental_teams.update_head', { department: this.selectedDepartment.id, user: member.id }), { team_head: isTeamHead }, {
                onSuccess: () => {
                    this.viewMembers(this.selectedDepartment)
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

    mounted() {
        // Add click outside event listener
        document.addEventListener('click', this.handleClickOutside)
    },

    beforeUnmount() {
        // Clean up event listener
        document.removeEventListener('click', this.handleClickOutside)
    },
}
</script>