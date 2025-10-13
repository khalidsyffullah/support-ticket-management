<template>
    <Head title="Update Password" />
  <div class="p-6 min-h-screen flex justify-center items-center light">
      <flash-messages />
    <div class="w-full max-w-md">
        <Link :href="route('home')"><logo class="block mx-auto w-full max-w-xs fill-white" height="50" /></Link>
      <form class="mt-8 bg-white dark:bg-slate-900 border border-gray-100 rounded-lg shadow-xl overflow-hidden" @submit.prevent="updatePassword" autocomplete="off">
        <div class="px-10 py-12">
          <h2 class="text-center font-bold text-xl">{{ $t('Update Password') }}</h2>
          <div class="mx-auto mt-3 w-24 border-b" />
          <p class="text-center text-gray-600 mt-4">Your password has expired. Please choose a new one.</p>
            <text-input v-model="form.password" :error="form.errors.password" class="mt-6" :label="$t('New Password')" type="password" autocomplete="off" aria-autocomplete="none" />
            <text-input v-model="form.password_confirmation" :error="form.errors.password_confirmation" class="mt-6" :label="$t('Confirm New Password')" type="password" autocomplete="off" aria-autocomplete="none" />
            <loading-button :loading="form.processing" class="ml-auto btn-indigo w-full items-center justify-center mt-8" type="submit">{{ $t('Update Password') }}</loading-button>
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

export default {
  metaInfo: { title: 'Update Password' },
  components: {
    LoadingButton,
    Logo,
    TextInput,
      Head,
      Link,
      FlashMessages,
  },
  data() {
    return {
      form: this.$inertia.form({
        password: '',
        password_confirmation: '',
      }),
    }
  },
  methods: {
      updatePassword() {
          this.form.post(this.route('password.expired.update'))
      },
  }
}
</script>
