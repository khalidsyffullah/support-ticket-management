<template>
  <div>
      <Head :title="title" />
    <div class="bg-white rounded-md shadow overflow-hidden max-w-full">
      <form @submit.prevent="update">
          <div class="p-8 -mr-6 -mb-8 flex flex-wrap">
              <text-input v-model="form.title" :error="form.errors.title" class="pr-6 pb-8 w-full lg:w-1/2" :label="$t('Title')" />
              <select-input v-model="form.type_id" :error="form.errors.type_id" class="pr-6 pb-8 w-full lg:w-1/4" :label="$t('Type')" :required="true">
                  <option :value="null">{{ $t('Select type') }}</option>
                  <option v-for="s in types" :key="s.id" :value="s.id">{{ s.name }}</option>
              </select-input>
              <select-input v-model="form.is_active" :error="form.errors.is_active" class="pr-6 pb-8 w-full lg:w-1/4" :label="$t('Is Active')" :required="true">
                  <option :value="1">Yes</option>
                  <option :value="0">No</option>
              </select-input>

              <div class="pr-6 pb-8 w-full">
                  <label class="form-label" >Details:</label>
                  <QuillEditor theme="snow" toolbar="full" v-model:content="form.details" contentType="html" />
              </div>
              <file-input v-model="form.image" :error="form.errors.image" class="pb-8 pr-6 w-full lg:w-1/3" type="file" accept="image/*" :label="$t('Feature image')" />
              <div class="w-full flex lg:w-1/3 justify-start"><img v-if="post.image" class="block mb-2 w-10 h-10" :src="post.image" /></div>
          </div>
        <div class="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center">
          <button class="text-red-600 hover:underline" tabindex="-1" type="button" @click="destroy">Delete Post</button>
          <loading-button :loading="form.processing" class="btn-indigo ml-auto" type="submit">Update Post</loading-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Layout from '@/Shared/Layout.vue'
import TextInput from '@/Shared/TextInput.vue'
import SelectInput from '@/Shared/SelectInput.vue'
import TextareaInput from '@/Shared/TextareaInput.vue'
import LoadingButton from '@/Shared/LoadingButton.vue'
import { Link, Head } from '@inertiajs/vue3'
import FileInput from '@/Shared/FileInput.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  components: {
    LoadingButton,
      SelectInput,
      TextareaInput,
      TextInput,
    Link,
      Head,
      FileInput,
      QuillEditor,
  },
  layout: Layout,
  props: {
      post: Object,
      title: String,
      types: Array,
  },
  remember: 'form',
  data() {
    return {
      form: this.$inertia.form({
          _method: 'put',
          title: this.post.title,
          type_id: this.post.type_id,
          is_active: this.post.is_active,
          image: null,
          details: this.post.details,
      }),
    }
  },
  methods: {
    update() {
        this.form.post(this.route('posts.update', this.post.id), {
            onSuccess: () => this.form.reset('image'),
        })
    },
    destroy() {
      if (confirm('Are you sure you want to delete this post?')) {
        this.$inertia.delete(this.route('posts.destroy', this.post.id))
      }
    },
  },
}
</script>
