<template>
  <div>
    <Head :title="$t('Create Notification')" />
    <div class="max-w-full bg-white rounded-md shadow overflow-hidden">
      <form @submit.prevent="store">
        <div class="flex flex-wrap -mb-8 -mr-6 p-8">
          <text-input v-model="form.title" :error="form.errors.title" class="pb-8 pr-6 w-full" :label="$t('Title')" :is_required="true" />
          <div class="pb-8 pr-6 w-full">
            <label class="form-label">{{ $t('Content') }}:</label>
            <QuillEditor theme="snow" toolbar="full" v-model:content="form.content" contentType="html" />
            <div v-if="form.errors.content" class="form-error">{{ form.errors.content }}</div>
          </div>
            <!-- Attachments -->
            <input ref="file" type="file" accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf, .zip" class="hidden" multiple="multiple" @change="fileInputChange" />
            <div class="pr-6 pb-8 w-full lg:w-full flex-col">
                <button type="button" class="btn flex justify-center items-center relative z-10 border-0" @click="fileBrowse">
                    <icon name="file" class="flex-shrink-0 h-8 fill-gray-400 pr-1" /> <h4>{{ $t('Attach files') }}</h4>
                </button>
                <div v-if="form.files.length" class="flex items-center justify-between pr-6 pt-8 w-full lg:w-1/2" v-for="(file, fi) in form.files" :key="fi">
                    <div class="flex-1 pr-1">
                        {{ file.name }} <span class="text-gray-500 text-xs">({{ getFileSize(file.size) }})</span>
                    </div>
                    <button type="button" class="btn flex justify-center items-center" @click="fileRemove(file, fi)">
                        {{ $t('Remove') }}</button>
                </div>
            </div>
            <!-- Attachments -->
            <text-input v-model="form.expires_at" :error="form.errors.expires_at" class="pb-8 pr-6 w-full lg:w-1/2" type="datetime-local" :label="$t('Expires At')" />


        </div>


        <div class="flex items-center justify-end px-8 py-4 bg-gray-50 border-t border-gray-100">
          <loading-button :loading="form.processing" class="btn-indigo" type="submit">{{ $t('Create') }}</loading-button>
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
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import Icon from '@/Shared/Icon.vue'

export default {
  components: {
    Head,
    Link,
    LoadingButton,
    TextInput,
    QuillEditor,
    Icon,
  },
  layout: Layout,
  props: {
    title: String,
  },
  remember: 'form',
  data() {
    return {
      form: this.$inertia.form({
        title: '',
        content: '',
        expires_at: null,
        files: [],
      }),
    }
  },
  methods: {
    store() {
      this.form.post(this.route('notifications.store'))
    },
    fileInputChange(e) {
        let selectedFiles = e.target.files;
        for (let i = 0; i < selectedFiles.length; i++) {
            this.form.files.push(selectedFiles[i]);
        }
    },
    fileRemove(image, index) {
        this.form.files.splice(index, 1);
    },
    getFileSize(size) {
        const i = Math.floor(Math.log(size) / Math.log(1024))
        return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
    },
    fileBrowse() {
        this.$refs.file.click()
    },
  },
}
</script>
