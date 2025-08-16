<template>
  <div>
    <Head :title="$t('Edit Notification')" />
    <div class="max-w-full bg-white rounded-md shadow overflow-hidden">
      <form @submit.prevent="update">
        <div class="flex flex-wrap -mb-8 -mr-6 p-8">
          <text-input v-model="form.title" :error="form.errors.title" class="pb-8 pr-6 w-full" :label="$t('Title')" :is_required="true" />
          <div class="pb-8 pr-6 w-full">
            <label class="form-label" for="content">{{ $t('Content') }}:</label>
            <textarea id="content" v-model="form.content" class="form-textarea" :class="{ 'error': form.errors.content }" ></textarea>
            <div v-if="form.errors.content" class="form-error">{{ form.errors.content }}</div>
          </div>
          <text-input v-model="form.expires_at" :error="form.errors.expires_at" class="pb-8 pr-6 w-full lg:w-1/2" type="datetime-local" :label="$t('Expires At')" />
        </div>
        <div class="flex items-center px-8 py-4 bg-gray-50 border-t border-gray-100">
          <button class="text-red-600 hover:underline" tabindex="-1" type="button" @click="destroy">{{ $t('Delete') }}</button>
          <loading-button :loading="form.processing" class="btn-indigo ml-auto" type="submit">{{ $t('Update') }}</loading-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Head, Link } from '@inertiajs/vue3'
import Layout from '@/Shared/Layout.vue'
import TextInput from '@/Shared/TextInput.vue'
import LoadingButton from '@/Shared/LoadingButton.vue'

export default {
  components: {
    Head,
    Link,
    LoadingButton,
    TextInput,
  },
  layout: Layout,
  props: {
    notification: Object,
    title: String,
  },
  remember: 'form',
  data() {
    return {
      form: this.$inertia.form({
        _method: 'put',
        title: this.notification.title,
        content: this.notification.content,
        expires_at: this.notification.expires_at,
      }),
    }
  },
  methods: {
    update() {
      this.form.post(this.route('notifications.update', this.notification.id))
    },
    destroy() {
      if (confirm('Are you sure you want to delete this notification?')) {
        this.$inertia.delete(this.route('notifications.destroy', this.notification.id))
      }
    },
  },
}
</script>
