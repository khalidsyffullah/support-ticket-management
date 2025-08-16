<template>
  <div>
    <!--        <h1 class="mb-8 font-bold text-3xl">-->
    <!--            <Link class="text-indigo-400 hover:text-indigo-600" :href="this.route('tickets')">{{ $t('Tickets') }}</Link>-->
    <!--            <span class="text-indigo-400 font-medium">/</span> {{ $t('Create') }}-->
    <!--        </h1>-->
    <div class="bg-white rounded-md shadow overflow-hidden max-w-full">
      <form @submit.prevent="store">
        <div class="p-8 -mr-6 -mb-8 flex flex-wrap">
          <select-input-filter
            placeholder="Start typing"
            :onInput="doFilter"
            :items="customers"
            v-if="user_access.ticket.update && auth.user.role.slug !== 'customer'"
            v-model="form.user_id"
            :error="form.errors.user_id"
            class="pr-6 pb-8 w-full lg:w-1/3"
            :label="$t('Customer')"
          >
          </select-input-filter>

          <select-input
            v-if="user_access.ticket.update && auth.user.role.slug !== 'customer'"
            v-model="form.priority_id"
            :error="form.errors.priority_id"
            class="pr-6 pb-8 w-full lg:w-1/3"
            :label="$t('Priority')"
          >
            <option :value="null" />
            <option v-for="s in priorities" :key="s.id" :value="s.id">
              {{ s.name }}
            </option>
          </select-input>
          <select-input
            v-if="!(hidden_fields && hidden_fields.includes('ticket_type'))"
            v-model="form.type_id"
            :error="form.errors.type_id"
            class="pr-6 pb-8 w-full lg:w-1/3"
            :label="$t('Type')"
          >
            <option :value="null" />
            <option v-for="s in types" :key="s.id" :value="s.id">{{ s.name }}</option>
          </select-input>

          <select-input
            v-if="
              !(hidden_fields && hidden_fields.includes('department')) &&
              auth.user.role.slug !== 'customer'
            "
            @change="getCategories()"
            v-model="form.department_id"
            :error="form.errors.department_id"
            class="pr-6 pb-5 md:col-span-6 lg:w-1/3"
            :label="$t('Department')"
          >
            <option :value="null">{{ $t("Select a department") }}</option>
            <option
              v-for="department in departments"
              :key="department.id"
              :value="department.id"
            >
              {{ department.name }}
            </option>
          </select-input>

          <select-input
            ref="category"
            v-if="
              !(hidden_fields && hidden_fields.includes('category')) && form.department_id
            "
            @change="getSubCategories()"
            v-model="form.category_id"
            :error="form.errors.category_id"
            class="pb-5 pr-6 md:col-span-6 lg:w-1/3"
            :label="$t('Category')"
          >
            <option :value="null">{{ $t("Select a category") }}</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select-input>

          <select-input
            ref="sub_category"
            v-if="form.category_id"
            v-model="form.sub_category_id"
            :error="form.errors.sub_category_id"
            class="pb-5 md:col-span-6 lg:w-1/3"
            :label="$t('Sub Category')"
          >
            <option :value="null">{{ $t("Select a sub category") }}</option>
            <option
              v-for="category in sub_categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select-input>

          <select-input-filter
            placeholder="Start typing"
            :onInput="doFilterUsersExceptCustomer"
            :items="usersExceptCustomers"
            v-if="
              auth.user.role.slug !== 'customer' &&
              user_access.ticket.update &&
              !(hidden_fields && hidden_fields.includes('assigned_to'))
            "
            v-model="form.assigned_to"
            :error="form.errors.assigned_to"
            class="pr-6 pb-8 w-full lg:w-1/3"
            :label="$t('Assigned to')"
          >
          </select-input-filter>

          <!--                    <div v-for="custom_field in custom_fields" class="pr-6 w-full lg:w-1/3" :key="custom_field.id">-->
          <!--                        <text-input v-model="form[custom_field.name]" :error="form.errors[custom_field.name]" :placeholder="custom_field.placeholder" class="pr-6 pb-8 w-full" :label="$t(custom_field.label)" />-->
          <!--                    </div>-->
          <div
            class="pr-6 pb-8 w-full lg:w-1/3"
            v-for="ticket_field in custom_fields"
            :key="ticket_field.id"
          >
            <div class="flex flex-col w-full">
              <label
                :for="
                  !['checkbox'].includes(ticket_field.type)
                    ? 'ticket_field_' + ticket_field.id
                    : null
                "
                class="form-label"
                >{{ ticket_field.label }}
                <small class="pl-2 text-xs" v-if="!ticket_field.required"
                  >(optional)</small
                ></label
              >
              <input
                v-if="['text', 'email', 'number'].includes(ticket_field.type)"
                v-model="form.custom_field[ticket_field.name]"
                :type="ticket_field.type"
                :id="'ticket_field_' + ticket_field.id"
                :placeholder="ticket_field.placeholder"
                :required="ticket_field.required"
                class="form-input"
              />
              <textarea
                v-if="ticket_field.type === 'textarea'"
                :id="'ticket_field_' + ticket_field.id"
                rows="2"
                v-model="form.custom_field[ticket_field.name]"
                class="form-textarea"
                :placeholder="ticket_field.placeholder"
              ></textarea>
              <p
                v-if="ticket_field.hint"
                class="mt-1 text-sm text-gray-500 dark:text-gray-300"
              >
                {{ ticket_field.hint }}
              </p>
            </div>
          </div>
          <text-input
            v-model="form.subject"
            :error="form.errors.subject"
            class="pr-6 pb-8 w-full lg:w-full"
            :label="$t('Subject')"
            @keyup="searchSuggestions"
          />
          <div
            v-if="suggestions.faqs.length || suggestions.knowledge_base.length"
            class="w-full mb-8"
          >
            <!-- suggestion box -->
            <div
              class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-t-xl"
            >
              <div class="flex items-center space-x-3">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h2 class="text-xl font-semibold">
                  You may also find solutions in these topics
                </h2>
              </div>
            </div>

            <!-- Content Container -->
            <div
              class="bg-white border-x border-b border-gray-200 rounded-b-xl shadow-lg"
            >
              <div class="max-h-[350px] overflow-y-auto p-6 space-y-8">
                <!-- FAQs Section -->
                <div v-if="suggestions.faqs.length" class="space-y-4">
                  <div class="flex items-center space-x-2 pb-3 border-b border-gray-100">
                    <svg
                      class="w-5 h-5 text-amber-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <h3 class="text-lg font-bold text-gray-800">
                      Frequently Asked Questions
                    </h3>
                    <span
                      class="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                    >
                      {{ suggestions.faqs.length }}
                    </span>
                  </div>

                  <div class="grid gap-4">
                    <div
                      v-for="faq in suggestions.faqs"
                      :key="'faq-' + faq.id"
                      class="group relative bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 rounded-lg border border-amber-200 hover:border-amber-300 transition-all duration-200 hover:shadow-md"
                    >
                      <a :href="route('faq')" target="_blank" class="block p-4 h-full">
                        <div class="flex items-start justify-between">
                          <div class="flex-1 min-w-0">
                            <h4
                              class="font-semibold text-gray-900 group-hover:text-amber-700 transition-colors duration-200 mb-2 line-clamp-2"
                            >
                              {{ faq.name }}
                            </h4>
                            <p
                              class="text-sm text-gray-600 group-hover:text-gray-700 line-clamp-3"
                            >
                              {{ truncate(faq.details, 170) }}
                            </p>
                          </div>
                          <svg
                            class="w-5 h-5 text-amber-400 group-hover:text-amber-600 transition-colors duration-200 ml-3 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            ></path>
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                <!-- Knowledge Base Section -->
                <div v-if="suggestions.knowledge_base.length" class="space-y-4">
                  <div class="flex items-center space-x-2 pb-3 border-b border-gray-100">
                    <svg
                      class="w-5 h-5 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h3 class="text-lg font-bold text-gray-800">Knowledge Base</h3>
                    <span
                      class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                    >
                      {{ suggestions.knowledge_base.length }}
                    </span>
                  </div>

                  <div class="grid gap-4">
                    <div
                      v-for="kb in suggestions.knowledge_base"
                      :key="'kb-' + kb.id"
                      class="group relative bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-lg border border-blue-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md"
                    >
                      <a
                        :href="route('kb.details', kb.id)"
                        target="_blank"
                        class="block p-4 h-full"
                      >
                        <div class="flex items-start justify-between">
                          <div class="flex-1 min-w-0">
                            <h4
                              class="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200 mb-2 line-clamp-2"
                            >
                              {{ kb.title }}
                            </h4>
                            <p
                              class="text-sm text-gray-600 group-hover:text-gray-700 line-clamp-3"
                            >
                              {{ truncate(kb.details, 170) }}
                            </p>
                          </div>
                          <svg
                            class="w-5 h-5 text-blue-400 group-hover:text-blue-600 transition-colors duration-200 ml-3 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            ></path>
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer -->
            </div>
          </div>
          <div class="pr-6 pb-8 w-full">
            <label class="form-label">Request Details:</label>
            <QuillEditor
              theme="snow"
              toolbar="full"
              v-model:content="form.details"
              contentType="html"
            />
          </div>
          <input
            ref="file"
            type="file"
            accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf, .zip"
            class="hidden"
            multiple="multiple"
            @change="fileInputChange"
          />
          <div class="pr-6 pb-8 w-full lg:w-full flex-col">
            <button
              type="button"
              class="btn flex justify-center items-center"
              @click="fileBrowse"
            >
              <icon name="file" class="flex-shrink-0 h-8 fill-gray-400 pr-1" />
              <h4>{{ $t("Attach files") }}</h4>
            </button>
            <div
              v-if="form.files.length"
              class="flex items-center justify-between pr-6 pt-8 w-full lg:w-1/2"
              v-for="(file, fi) in form.files"
              :key="fi"
            >
              <div class="flex-1 pr-1">
                {{ file.name }}
                <span class="text-gray-500 text-xs">({{ getFileSize(file.size) }})</span>
              </div>
              <button
                type="button"
                class="btn flex justify-center items-center"
                @click="fileRemove(file, fi)"
              >
                {{ $t("Remove") }}
              </button>
            </div>
          </div>
        </div>
        <div
          class="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-end items-center"
        >
          <loading-button :loading="form.processing" class="btn-indigo" type="submit"
            >{{ $t("Create") }} {{ $t("Ticket") }}</loading-button
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Link } from "@inertiajs/vue3";
import Icon from "@/Shared/Icon.vue";
import Layout from "@/Shared/Layout.vue";
import TextInput from "@/Shared/TextInput.vue";
import SelectInput from "@/Shared/SelectInput.vue";
import SelectInputFilter from "@/Shared/SelectInputFilter.vue";
import TextareaInput from "@/Shared/TextareaInput.vue";
import LoadingButton from "@/Shared/LoadingButton.vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import axios from "axios";
import debounce from "lodash/debounce";

export default {
  components: {
    LoadingButton,
    SelectInput,
    SelectInputFilter,
    TextInput,
    TextareaInput,
    Link,
    Icon,
    QuillEditor,
  },
  layout: Layout,
  props: {
    customers: Array,
    usersExceptCustomers: Array,
    priorities: Array,
    statuses: Array,
    types: Array,
    departments: Array,
    all_categories: Array,
    auth: Object,
    hidden_fields: Object,
    custom_fields: Object,
  },
  remember: false,
  data() {
    return {
      user_access: this.$page.props.auth.user.access,
      categories: [],
      sub_categories: [],
      suggestions: {
        faqs: [],
        knowledge_base: [],
      },
      form: this.$inertia.form({
        user_id: null,
        priority_id: null,
        status_id: null,
        department_id: null,
        category_id: null,
        sub_category_id: null,
        assigned_to: null,
        type_id: null,
        subject: null,
        details: "",
        files: [],
        custom_field: {},
      }),
    };
  },
  created() {
    this.setDefaultValue(this.statuses, "status_id", "Pending");
    this.setDefaultValue(this.priorities, "priority_id", "Generally");
  },
  methods: {
    truncate(text, length) {
      if (text && text.length > length) {
        return text.substring(0, length) + "...";
      }
      return text;
    },
    searchSuggestions: debounce(function () {
      if (this.form.subject.split(" ").filter((n) => n != "").length < 1) {
        this.suggestions.faqs = [];
        this.suggestions.knowledge_base = [];
        return;
      }

      axios
        .get(this.route("tickets.suggestions", { search: this.form.subject }))
        .then((response) => {
          this.suggestions = response.data;
        });
    }, 500),
    getCategories() {
      this.categories = this.all_categories.filter(
        (cat) => cat.department_id === this.form.department_id
      );
      this.form.category_id = null;
      this.$refs.category.selected = null;
    },
    getSubCategories() {
      this.sub_categories = this.all_categories.filter(
        (cat) => cat.parent_id === this.form.category_id
      );
      this.form.sub_category_id = null;
      this.$refs.sub_category.selected = null;
    },
    doFilter(e) {
      axios
        .get(this.route("filter.customers", { search: e.target.value }))
        .then((res) => {
          this.customers.splice(0, this.customers.length, ...res.data);
        });
    },
    doFilterUsersExceptCustomer(e) {
      axios
        .get(this.route("filter.users_except_customer", { search: e.target.value }))
        .then((res) => {
          this.usersExceptCustomers.splice(
            0,
            this.usersExceptCustomers.length,
            ...res.data
          );
        });
    },
    setDefaultValue(arr, key, value) {
      const find = arr.find((i) => i.name.match(new RegExp(value + ".*")));
      if (find) {
        this.form[key] = find["id"];
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
    getFileSize(size) {
      const i = Math.floor(Math.log(size) / Math.log(1024));
      return (
        (size / Math.pow(1024, i)).toFixed(2) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i]
      );
    },
    fileBrowse() {
      this.$refs.file.click();
    },
    store() {
      if (this.auth.user.role.slug === "customer") {
        this.form.user_id = this.auth.user.id;
      }
      this.form.post(this.route("tickets.store"));
    },
  },
};
</script>
