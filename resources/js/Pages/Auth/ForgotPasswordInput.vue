<template>
    <Head title="Reset Password" />
  <div class="p-6 min-h-screen flex justify-center items-center light">
      <flash-messages />
    <div class="w-full max-w-md">
        <Link :href="route('home')"><logo class="block mx-auto w-full max-w-xs fill-white" height="50" /></Link>
      <form class="mt-8 bg-white dark:bg-slate-900 border border-gray-100 rounded-lg shadow-xl overflow-hidden" @submit.prevent="resetPassword" autocomplete="off">
        <div class="px-10 py-12">
          <h2 class="text-center font-bold text-xl">{{ $t('Reset Password') }}</h2>
          <div class="mx-auto mt-3 w-24 border-b" />
          <text-input v-model="form.email" :error="form.errors.email" class="mt-10" :label="$t('Email Address')" type="email" autofocus autocomplete="off" aria-autocomplete="none" />
            <password-input v-model="form.password" :error="form.errors.password" class="mt-6" :label="$t('Password')" @strength="updatePasswordStrength" />
            <text-input v-model="form.password_confirmation" :error="form.errors.password_confirmation" class="mt-6" :label="$t('Confirm Password')" type="password" autocomplete="off" aria-autocomplete="none" />
            <div v-if="isFormInvalid" class="mt-4 text-sm text-red-600">
                <ul>
                    <li v-for="requirement in formRequirements" :key="requirement">{{ requirement }}</li>
                </ul>
            </div>
            <loading-button :disabled="isFormInvalid" :loading="form.processing" class="ml-auto btn-indigo w-full items-center justify-center mt-8" type="submit">{{ $t('Reset Password') }}</loading-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Logo from '@/Shared/Logo.vue'
import TextInput from '@/Shared/TextInput.vue'
import LoadingButton from '@/Shared/LoadingButton.vue'
import { Head, Link } from '@inertiajs/vue3'
import FlashMessages from '@/Shared/FlashMessages.vue'
import PasswordInput from '@/Shared/PasswordInput.vue'

export default {
  metaInfo: { title: 'Login' },
  components: {
    LoadingButton,
    Logo,
    TextInput,
      Head,
      Link,
      FlashMessages,
      PasswordInput,
  },
    props: {
        is_demo: Number,
        token: String
    },
  data() {
    return {
        passwordStrength: '',
      form: this.$inertia.form({
        email: '',
        password: '',
          password_confirmation: '',
          token: this.token
      }),
    }
  },
    computed: {
        isFormInvalid() {
            return this.passwordStrength !== 'Strong' || this.form.password.trim() !== this.form.password_confirmation.trim();
        },
        formRequirements() {
            const requirements = [];
            if (this.passwordStrength !== 'Strong') requirements.push('Password must be strong.');
            if (this.form.password.trim() !== this.form.password_confirmation.trim()) requirements.push('Passwords do not match.');
            return requirements;
        }
    },
  methods: {
      updatePasswordStrength(strength) {
          this.passwordStrength = strength;
      },
      resetPassword() {
          this.form.post(this.route('password.reset.store'))
      },
  }
}
</script>
