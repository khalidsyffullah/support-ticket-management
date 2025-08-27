<template>
  <div>
    <Head :title="$t('Edit Notification')" />
    <div class="max-w-full bg-white rounded-md shadow overflow-hidden">
      <form @submit.prevent="update">
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
                <div v-if="attachments.length" class="flex items-center justify-between pr-6 pt-8 w-full" v-for="(file, fi) in attachments" :key="fi">
                    <div class="flex-1 pr-1">
                        {{ file.name }}
                    </div>
                    <div class="a__buttons flex justify-end items-center ">
                        <button type="button" class="btn flex items-center " @click="downloadAttachment(file)">
                            {{ $t('Download') }}</button>
                        <button type="button" class="btn flex items-center ml-3" @click="removeAttachment(file, fi)">
                            {{ $t('Remove') }}</button>
                    </div>
                </div>
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
    notification: Object,
    title: String,
  },
  remember: 'form',
  data() {
    return {
      attachments: this.notification.attachments || [],
      form: this.$inertia.form({
        _method: 'put',
        title: this.notification.title,
        content: this.notification.content,
        expires_at: this.notification.expires_at,
        files: [],
        removedFiles: [],
      }),
    }
  },
  methods: {
    update() {
      this.form.post(this.route('notifications.update', this.notification.id), {
          onSuccess: () => {
              this.form.files = [];
              this.form.removedFiles = [];
          }
      })
    },
    destroy() {
      if (confirm('Are you sure you want to delete this notification?')) {
        this.$inertia.delete(this.route('notifications.destroy', this.notification.id))
      }
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
    fileBrowse() {
        this.$refs.file.click()
    },
    downloadAttachment(file) {
        const link = document.createElement("a");
        link.href = window.location.origin + '/files/' + file.path;
        link.download = file.name;
        link.click();
    },
    removeAttachment(file, index) {
        this.attachments.splice(index, 1);
        this.form.removedFiles.push(file.id)
    },
    getFileSize(size) {
        const i = Math.floor(Math.log(size) / Math.log(1024))
        return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
    },
  },
}
</script>
