<template>
  <div>
    <Head :title="title" />
    <div class="max-w-full bg-white rounded-md shadow overflow-hidden">
      <form @submit.prevent="update">
        <div class="flex flex-wrap -mb-8 -mr-6 p-8">
          <text-input v-model="form.first_name" :error="form.errors.first_name" class="pb-8 pr-6 w-full lg:w-1/3" :label="$t('First name')" :is_required="true" />
          <text-input v-model="form.last_name" :error="form.errors.last_name" class="pb-8 pr-6 w-full lg:w-1/3" :label="$t('Last name')" :is_required="true" />
          <text-input v-model="form.email" :error="form.errors.email" class="pb-8 pr-6 w-full lg:w-1/3" :label="$t('Email')" :is_required="true" />
          <text-input v-model="form.phone" :error="form.errors.phone" class="pb-8 pr-6 w-full lg:w-1/3" :label="$t('Phone')" />
          <text-input v-model="form.city" :error="form.errors.city" class="pb-8 pr-6 w-full lg:w-1/3" :label="$t('City')"  />
          <text-input v-model="form.address" :error="form.errors.address" class="pb-8 pr-6 w-full lg:w-1/3" :label="$t('Address')"  />
          <select-input v-model="form.country_id" :error="form.errors.country_id" class="pr-6 pb-8 w-full lg:w-1/3" :label="$t('Country')" >
            <option value="19">Bangladesh</option>
          </select-input>
          <text-input v-if="user.organization_name" v-model="user.organization_name" class="pb-8 pr-6 w-full lg:w-1/3" :label="$t('Organization Name')" :readonly="true" />

          <div class="pr-6 pb-8 w-full lg:w-1/3">
            <select-input v-model="form.organization_id" :error="form.errors.organization_id" :label="$t('Organization')" :is_required="true" :key="organizationKey">
              <option :value="null" />
              <option v-for="o in organizations" :key="o.id" :value="o.id">{{ $t(o.name) }}</option>
            </select-input>

            <div v-if="suggestions.length" class="mt-2">
              <p class="text-sm font-semibold text-gray-700 mb-1">Suggestions:</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="suggestion in suggestions"
                  :key="suggestion.id"
                  @click="selectSuggestion(suggestion)"
                  class="inline-block cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm px-3 py-1 rounded-full transition-colors duration-200"
                >
                  {{ suggestion.name }}
                </span>
              </div>
            </div>
          </div>

          <text-input v-model="form.password" :error="form.errors.password" class="pb-8 pr-6 w-full lg:w-1/3" type="password" autocomplete="new-password" :label="$t('Password')" />
          <file-input v-model="form.photo_path" :error="form.errors.photo_path" class="pb-8 pr-6 w-full lg:w-1/3" type="file" accept="image/*" label="Photo" />
          <div class="w-full lg:w-1/3 flex items-center justify-start"><img v-if="user.photo_path" class="block mb-2 w-8 h-8 rounded-full" :src="user.photo_path" /></div>
        </div>
        <div class="flex items-center px-8 py-4 bg-gray-50 border-t border-gray-100">
          <select-input v-model="form.approval_status" :error="form.errors.approval_status" class="pr-6 pb-8 w-full lg:w-1/3" :label="$t('Approval Status')" @change="updateApprovalStatus">
            <option value="pending">{{ $t('Pending') }}</option>
            <option value="approved">{{ $t('Approved') }}</option>
            <option value="rejected">{{ $t('Rejected') }}</option>
          </select-input>
          <button
            v-if="user.id !== auth.user.id && user_access.customer.delete"
            class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
            tabindex="-1"
            type="button"
            @click="destroy"
          >
            {{ $t('Delete') }}
          </button>
          <loading-button
            :loading="form.processing"
            :disabled="!form.organization_id"
            class="btn-indigo ml-auto"
            type="submit"
          >
            {{ $t('Update') }}
          </loading-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Head, Link } from '@inertiajs/vue3'
import Layout from '@/Shared/Layout.vue'
import TextInput from '@/Shared/TextInput.vue'
import FileInput from '@/Shared/FileInput.vue'
import SelectInput from '@/Shared/SelectInput.vue'
import LoadingButton from '@/Shared/LoadingButton.vue'
import axios from "axios";

export default {
  components: {
    FileInput,
    Head,
    Link,
    LoadingButton,
    SelectInput,
    TextInput,
  },
  layout: Layout,
  props: {
    user: Object,
    auth: Object,
    countries: Array,
    organizations: Array,
    cities: Array,
    title: String,
  },
  remember: 'form',
  data() {
    return {
      user_access: this.$page.props.auth.user.access,
      form: this.$inertia.form({
        _method: 'put',
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        phone: this.user.phone,
        city: this.user.city,
        address: this.user.address,
        country_id: this.user.country_id,
        organization_id: this.user.organization_id,
        approval_status: this.user.approval_status,
        password: '',
        photo_path: null
      }),
      suggestions: [],
      organizationKey: 0,
    }
  },
  watch: {
    'user.organization_name': {
      handler(newName) {
        if (newName) {
          this.fetchSuggestions(newName);
        }
      },
      immediate: true,
    },
  },
  methods: {
    async fetchSuggestions(query) {
      try {
        const response = await axios.get(route('customers.organization-suggestions', { query }));
        this.suggestions = response.data;
      } catch (error) {
        console.error('Error fetching organization suggestions:', error);
      }
    },
    selectSuggestion(suggestion) {
      this.form.organization_id = suggestion.id;
      // Force re-render of select input
      this.organizationKey++;
    },
    setDefaultValue(arr, key, value){
      const find = arr.find(i=>i.name.match(new RegExp(value + ".*")))
      if(find){
        this.form[key] = find['id']
      }
    },
    update() {
      this.form.post(this.route('customers.update', this.user.id), {
        onSuccess: () => this.form.reset('password', 'photo'),
      })
    },
    updateApprovalStatus() {
      this.$inertia.put(this.route('customers.updateApprovalStatus', this.user.id), {
        approval_status: this.form.approval_status,
        _method: 'put',
      }, {
        preserveScroll: true,
        preserveState: true,
      })
    },
    destroy() {
      if (confirm('Are you sure you want to delete this user?')) {
        this.$inertia.delete(this.route('customers.destroy', this.user.id))
      }
    },
    restore() {
      if (confirm('Are you sure you want to restore this user?')) {
        this.form.put(this.route('customers.restore', this.user.id))
      }
    },
  },
}
</script>
