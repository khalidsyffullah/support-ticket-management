<template>
  <div>
    <Head :title="$t(title)" />
    <div class="max-w-full bg-white rounded-md shadow overflow-hidden">
      <form @submit.prevent="store">
        <div class="flex flex-wrap -mb-8 -mr-6 p-8">
          <text-input v-model="form.first_name" :error="form.errors.first_name" class="pb-8 pr-6 w-full lg:w-1/3" :label="$t('First name')" :is_required="true" />
          <text-input v-model="form.last_name" :error="form.errors.last_name" class="pb-8 pr-6 w-full lg:w-1/3" :label="$t('Last name')" :is_required="true"/>
          <text-input v-model="form.email" :error="form.errors.email" class="pb-8 pr-6 w-full lg:w-1/3" :label="$t('Email')" :is_required="true" />
          <text-input v-model="form.phone" :error="form.errors.phone" class="pb-8 pr-6 w-full lg:w-1/2" :label="$t('Phone')" :is_required="true"/>
          <text-input v-model="form.city" :error="form.errors.city" class="pb-8 pr-6 w-full lg:w-1/2" :label="$t('City')" />
          <text-input v-model="form.address" :error="form.errors.address" class="pb-8 pr-6 w-full lg:w-1/3" :label="$t('Address')"  />
          <select-input v-model="form.country_id" :error="form.errors.country_id" class="pr-6 pb-8 w-full lg:w-1/3" :label="$t('Country')" :disabled="true">
            <option value="19">Bangladesh</option>
          </select-input>
          <select-input v-model="form.organization_id" :error="form.errors.organization_id" class="pr-6 pb-8 w-full lg:w-1/3" :label="$t('Organization')" :is_required="true" required>
            <option :value="null" />
            <option v-for="o in organizations" :key="o.id" :value="o.id">{{ $t(o.name) }}</option>
          </select-input>
          <password-input v-model="form.password" :error="form.errors.password" class="pb-8 pr-6 w-full lg:w-1/3" :label="$t('Password')" :is_required="true" @strength="updatePasswordStrength" />
          <text-input v-model="form.confirm_password" :error="form.errors.confirm_password" class="pb-8 pr-6 w-full lg:w-1/3" type="password" autocomplete="new-password" :label="$t('Confirm Password')" :is_required="true" />
          <file-input v-model="form.photo" :error="form.errors.photo" class="pb-8 pr-6 w-full lg:w-1/2" type="file" accept="image/*" :label="$t('Photo')" />
        </div>
        <div class="flex items-center justify-end px-8 py-4 bg-gray-50 border-t border-gray-100">
          <loading-button :disabled="isFormInvalid" :loading="form.processing" class="btn-indigo" type="submit">{{ $t('create') }}</loading-button>
        </div>
        <div v-if="isFormInvalid" class="px-8 py-4 bg-gray-50 border-t border-gray-100 text-sm text-red-600">
            <ul>
                <li v-for="requirement in formRequirements" :key="requirement">{{ requirement }}</li>
            </ul>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Head, Link } from '@inertiajs/vue3'
import Layout from '@/Shared/Layout.vue'
import FileInput from '@/Shared/FileInput.vue'
import TextInput from '@/Shared/TextInput.vue'
import SelectInput from '@/Shared/SelectInput.vue'
import LoadingButton from '@/Shared/LoadingButton.vue'
import PasswordInput from '@/Shared/PasswordInput.vue'

export default {
  components: {
    FileInput,
    Head,
    Link,
    LoadingButton,
    SelectInput,
    TextInput,
    PasswordInput,
  },
  layout: Layout,
  props: {
    countries: Array,
    organizations: Array,
    cities: Array,
    title: String,
  },
  remember: 'form',
  data() {
    return {
      passwordStrength: '',
      form: this.$inertia.form({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        city: null,
        address: '',
        country_id: 19,
        organization_id: null,
        password: '',
        confirm_password: '',
        role_id: null,
        photo: null
      }),
    }
  },
  computed: {
      isFormInvalid() {
          return !this.form.first_name || !this.form.last_name || !this.form.email || !this.form.organization_id || this.passwordStrength !== 'Strong' || this.form.password.trim() !== this.form.confirm_password.trim();
      },
      formRequirements() {
          const requirements = [];
          if (!this.form.first_name) requirements.push('First name is required.');
          if (!this.form.last_name) requirements.push('Last name is required.');
          if (!this.form.email) requirements.push('Email is required.');
          if (!this.form.organization_id) requirements.push('Organization is required.');
          if (this.passwordStrength !== 'Strong') requirements.push('Password must be strong.');
          if (this.form.password.trim() !== this.form.confirm_password.trim()) requirements.push('Passwords do not match.');
          return requirements;
      }
  },
  created() {
    // this.setDefaultValue(this.countries, 'country_id', 'United States')
  },
  methods: {
    updatePasswordStrength(strength) {
        this.passwordStrength = strength;
    },
    setDefaultValue(arr, key, value){
      const find = arr.find(i=>i.name.match(new RegExp(value + ".*")))
      if(find){
        this.form[key] = find['id']
      }
    },
    store() {
      this.form.post(this.route('customers.store'))
    },
  },
}
</script>
