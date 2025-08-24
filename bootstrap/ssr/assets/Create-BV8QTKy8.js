import { Link } from "@inertiajs/vue3";
import { I as Icon } from "./Dropdown-r9pN8E8G.js";
import { L as Layout } from "./Layout-D--1U9Yf.js";
import { T as TextInput } from "./TextInput-DD86V4Y6.js";
import { S as SelectInput } from "./SelectInput-M1wEP0ef.js";
import { S as SelectInputFilter } from "./SelectInputFilter-BWStuymG.js";
import { T as TextareaInput } from "./TextareaInput-CsKB0Ez_.js";
import { L as LoadingButton } from "./LoadingButton-C_hDdjdK.js";
import { QuillEditor } from "@vueup/vue-quill";
/* empty css                        */
import axios from "axios";
import debounce from "lodash/debounce.js";
import { resolveComponent, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderDynamicModel, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "./FlashMessages-BlPv0OK4.js";
import "@popperjs/core";
import "moment";
import "laravel-vue-i18n";
import "@heroicons/vue/24/outline";
import "uuid";
const _sfc_main = {
  components: {
    LoadingButton,
    SelectInput,
    SelectInputFilter,
    TextInput,
    TextareaInput,
    Link,
    Icon,
    QuillEditor
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
    custom_fields: Object
  },
  remember: false,
  data() {
    return {
      user_access: this.$page.props.auth.user.access,
      categories: [],
      sub_categories: [],
      suggestions: {
        faqs: [],
        knowledge_base: []
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
        custom_field: {}
      })
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
    searchSuggestions: debounce(function() {
      if (this.form.subject.split(" ").filter((n) => n != "").length < 1) {
        this.suggestions.faqs = [];
        this.suggestions.knowledge_base = [];
        return;
      }
      axios.get(this.route("tickets.suggestions", { search: this.form.subject })).then((response) => {
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
      axios.get(this.route("filter.customers", { search: e.target.value })).then((res) => {
        this.customers.splice(0, this.customers.length, ...res.data);
      });
    },
    doFilterUsersExceptCustomer(e) {
      axios.get(this.route("filter.users_except_customer", { search: e.target.value })).then((res) => {
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
      return (size / Math.pow(1024, i)).toFixed(2) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i];
    },
    fileBrowse() {
      this.$refs.file.click();
    },
    store() {
      if (this.auth.user.role.slug === "customer") {
        this.form.user_id = this.auth.user.id;
      }
      this.form.post(this.route("tickets.store"));
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_select_input_filter = resolveComponent("select-input-filter");
  const _component_select_input = resolveComponent("select-input");
  const _component_text_input = resolveComponent("text-input");
  const _component_QuillEditor = resolveComponent("QuillEditor");
  const _component_icon = resolveComponent("icon");
  const _component_loading_button = resolveComponent("loading-button");
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-7fe9ccff><div class="bg-white rounded-md shadow overflow-hidden max-w-full" data-v-7fe9ccff><form data-v-7fe9ccff><div class="p-8 -mr-6 -mb-8 flex flex-wrap" data-v-7fe9ccff>`);
  if ($data.user_access.ticket.update && $props.auth.user.role.slug !== "customer") {
    _push(ssrRenderComponent(_component_select_input_filter, {
      placeholder: "Start typing",
      onInput: $options.doFilter,
      items: $props.customers,
      modelValue: $data.form.user_id,
      "onUpdate:modelValue": ($event) => $data.form.user_id = $event,
      error: $data.form.errors.user_id,
      class: "pr-6 pb-8 w-full lg:w-1/3",
      label: _ctx.$t("Customer")
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if ($data.user_access.ticket.update && $props.auth.user.role.slug !== "customer") {
    _push(ssrRenderComponent(_component_select_input, {
      modelValue: $data.form.priority_id,
      "onUpdate:modelValue": ($event) => $data.form.priority_id = $event,
      error: $data.form.errors.priority_id,
      class: "pr-6 pb-8 w-full lg:w-1/3",
      label: _ctx.$t("Priority")
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<option${ssrRenderAttr("value", null)} data-v-7fe9ccff${_scopeId}></option><!--[-->`);
          ssrRenderList($props.priorities, (s) => {
            _push2(`<option${ssrRenderAttr("value", s.id)} data-v-7fe9ccff${_scopeId}>${ssrInterpolate(s.name)}</option>`);
          });
          _push2(`<!--]-->`);
        } else {
          return [
            createVNode("option", { value: null }),
            (openBlock(true), createBlock(Fragment, null, renderList($props.priorities, (s) => {
              return openBlock(), createBlock("option", {
                key: s.id,
                value: s.id
              }, toDisplayString(s.name), 9, ["value"]);
            }), 128))
          ];
        }
      }),
      _: 1
    }, _parent));
  } else {
    _push(`<!---->`);
  }
  if (!($props.hidden_fields && $props.hidden_fields.includes("ticket_type"))) {
    _push(ssrRenderComponent(_component_select_input, {
      modelValue: $data.form.type_id,
      "onUpdate:modelValue": ($event) => $data.form.type_id = $event,
      error: $data.form.errors.type_id,
      class: "pr-6 pb-8 w-full lg:w-1/3",
      label: _ctx.$t("Type")
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<option${ssrRenderAttr("value", null)} data-v-7fe9ccff${_scopeId}></option><!--[-->`);
          ssrRenderList($props.types, (s) => {
            _push2(`<option${ssrRenderAttr("value", s.id)} data-v-7fe9ccff${_scopeId}>${ssrInterpolate(s.name)}</option>`);
          });
          _push2(`<!--]-->`);
        } else {
          return [
            createVNode("option", { value: null }),
            (openBlock(true), createBlock(Fragment, null, renderList($props.types, (s) => {
              return openBlock(), createBlock("option", {
                key: s.id,
                value: s.id
              }, toDisplayString(s.name), 9, ["value"]);
            }), 128))
          ];
        }
      }),
      _: 1
    }, _parent));
  } else {
    _push(`<!---->`);
  }
  if (!($props.hidden_fields && $props.hidden_fields.includes("department")) && $props.auth.user.role.slug !== "customer") {
    _push(ssrRenderComponent(_component_select_input, {
      onChange: ($event) => $options.getCategories(),
      modelValue: $data.form.department_id,
      "onUpdate:modelValue": ($event) => $data.form.department_id = $event,
      error: $data.form.errors.department_id,
      class: "pr-6 pb-5 md:col-span-6 lg:w-1/3",
      label: _ctx.$t("Department")
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<option${ssrRenderAttr("value", null)} data-v-7fe9ccff${_scopeId}>${ssrInterpolate(_ctx.$t("Select a department"))}</option><!--[-->`);
          ssrRenderList($props.departments, (department) => {
            _push2(`<option${ssrRenderAttr("value", department.id)} data-v-7fe9ccff${_scopeId}>${ssrInterpolate(department.name)}</option>`);
          });
          _push2(`<!--]-->`);
        } else {
          return [
            createVNode("option", { value: null }, toDisplayString(_ctx.$t("Select a department")), 1),
            (openBlock(true), createBlock(Fragment, null, renderList($props.departments, (department) => {
              return openBlock(), createBlock("option", {
                key: department.id,
                value: department.id
              }, toDisplayString(department.name), 9, ["value"]);
            }), 128))
          ];
        }
      }),
      _: 1
    }, _parent));
  } else {
    _push(`<!---->`);
  }
  if (!($props.hidden_fields && $props.hidden_fields.includes("category")) && $data.form.department_id) {
    _push(ssrRenderComponent(_component_select_input, {
      ref: "category",
      onChange: ($event) => $options.getSubCategories(),
      modelValue: $data.form.category_id,
      "onUpdate:modelValue": ($event) => $data.form.category_id = $event,
      error: $data.form.errors.category_id,
      class: "pb-5 pr-6 md:col-span-6 lg:w-1/3",
      label: _ctx.$t("Category")
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<option${ssrRenderAttr("value", null)} data-v-7fe9ccff${_scopeId}>${ssrInterpolate(_ctx.$t("Select a category"))}</option><!--[-->`);
          ssrRenderList($data.categories, (category) => {
            _push2(`<option${ssrRenderAttr("value", category.id)} data-v-7fe9ccff${_scopeId}>${ssrInterpolate(category.name)}</option>`);
          });
          _push2(`<!--]-->`);
        } else {
          return [
            createVNode("option", { value: null }, toDisplayString(_ctx.$t("Select a category")), 1),
            (openBlock(true), createBlock(Fragment, null, renderList($data.categories, (category) => {
              return openBlock(), createBlock("option", {
                key: category.id,
                value: category.id
              }, toDisplayString(category.name), 9, ["value"]);
            }), 128))
          ];
        }
      }),
      _: 1
    }, _parent));
  } else {
    _push(`<!---->`);
  }
  if ($data.form.category_id) {
    _push(ssrRenderComponent(_component_select_input, {
      ref: "sub_category",
      modelValue: $data.form.sub_category_id,
      "onUpdate:modelValue": ($event) => $data.form.sub_category_id = $event,
      error: $data.form.errors.sub_category_id,
      class: "pb-5 md:col-span-6 lg:w-1/3",
      label: _ctx.$t("Sub Category")
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<option${ssrRenderAttr("value", null)} data-v-7fe9ccff${_scopeId}>${ssrInterpolate(_ctx.$t("Select a sub category"))}</option><!--[-->`);
          ssrRenderList($data.sub_categories, (category) => {
            _push2(`<option${ssrRenderAttr("value", category.id)} data-v-7fe9ccff${_scopeId}>${ssrInterpolate(category.name)}</option>`);
          });
          _push2(`<!--]-->`);
        } else {
          return [
            createVNode("option", { value: null }, toDisplayString(_ctx.$t("Select a sub category")), 1),
            (openBlock(true), createBlock(Fragment, null, renderList($data.sub_categories, (category) => {
              return openBlock(), createBlock("option", {
                key: category.id,
                value: category.id
              }, toDisplayString(category.name), 9, ["value"]);
            }), 128))
          ];
        }
      }),
      _: 1
    }, _parent));
  } else {
    _push(`<!---->`);
  }
  if ($props.auth.user.role.slug !== "customer" && $data.user_access.ticket.update && !($props.hidden_fields && $props.hidden_fields.includes("assigned_to"))) {
    _push(ssrRenderComponent(_component_select_input_filter, {
      placeholder: "Start typing",
      onInput: $options.doFilterUsersExceptCustomer,
      items: $props.usersExceptCustomers,
      modelValue: $data.form.assigned_to,
      "onUpdate:modelValue": ($event) => $data.form.assigned_to = $event,
      error: $data.form.errors.assigned_to,
      class: "pr-6 pb-8 w-full lg:w-1/3",
      label: _ctx.$t("Assigned to")
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`<!--[-->`);
  ssrRenderList($props.custom_fields, (ticket_field) => {
    _push(`<div class="pr-6 pb-8 w-full lg:w-1/3" data-v-7fe9ccff><div class="flex flex-col w-full" data-v-7fe9ccff><label${ssrRenderAttr(
      "for",
      !["checkbox"].includes(ticket_field.type) ? "ticket_field_" + ticket_field.id : null
    )} class="form-label" data-v-7fe9ccff>${ssrInterpolate(ticket_field.label)} `);
    if (!ticket_field.required) {
      _push(`<small class="pl-2 text-xs" data-v-7fe9ccff>(optional)</small>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</label>`);
    if (["text", "email", "number"].includes(ticket_field.type)) {
      _push(`<input${ssrRenderDynamicModel(ticket_field.type, $data.form.custom_field[ticket_field.name], null)}${ssrRenderAttr("type", ticket_field.type)}${ssrRenderAttr("id", "ticket_field_" + ticket_field.id)}${ssrRenderAttr("placeholder", ticket_field.placeholder)}${ssrIncludeBooleanAttr(ticket_field.required) ? " required" : ""} class="form-input" data-v-7fe9ccff>`);
    } else {
      _push(`<!---->`);
    }
    if (ticket_field.type === "textarea") {
      _push(`<textarea${ssrRenderAttr("id", "ticket_field_" + ticket_field.id)} rows="2" class="form-textarea"${ssrRenderAttr("placeholder", ticket_field.placeholder)} data-v-7fe9ccff>${ssrInterpolate($data.form.custom_field[ticket_field.name])}</textarea>`);
    } else {
      _push(`<!---->`);
    }
    if (ticket_field.hint) {
      _push(`<p class="mt-1 text-sm text-gray-500 dark:text-gray-300" data-v-7fe9ccff>${ssrInterpolate(ticket_field.hint)}</p>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div>`);
  });
  _push(`<!--]-->`);
  _push(ssrRenderComponent(_component_text_input, {
    modelValue: $data.form.subject,
    "onUpdate:modelValue": ($event) => $data.form.subject = $event,
    error: $data.form.errors.subject,
    class: "pr-6 pb-8 w-full lg:w-full",
    label: _ctx.$t("Subject"),
    onKeyup: $options.searchSuggestions
  }, null, _parent));
  if ($data.suggestions.faqs.length || $data.suggestions.knowledge_base.length) {
    _push(`<div class="w-full mb-8" data-v-7fe9ccff><div class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-t-xl" data-v-7fe9ccff><div class="flex items-center space-x-3" data-v-7fe9ccff><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7fe9ccff><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-7fe9ccff></path></svg><h2 class="text-xl font-semibold" data-v-7fe9ccff> You may also find solutions in these topics </h2></div></div><div class="bg-white border-x border-b border-gray-200 rounded-b-xl shadow-lg" data-v-7fe9ccff><div class="max-h-[350px] overflow-y-auto p-6 space-y-8" data-v-7fe9ccff>`);
    if ($data.suggestions.faqs.length) {
      _push(`<div class="space-y-4" data-v-7fe9ccff><div class="flex items-center space-x-2 pb-3 border-b border-gray-100" data-v-7fe9ccff><svg class="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20" data-v-7fe9ccff><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" data-v-7fe9ccff></path></svg><h3 class="text-lg font-bold text-gray-800" data-v-7fe9ccff> Frequently Asked Questions </h3><span class="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full" data-v-7fe9ccff>${ssrInterpolate($data.suggestions.faqs.length)}</span></div><div class="flex flex-wrap gap-4" data-v-7fe9ccff><!--[-->`);
      ssrRenderList($data.suggestions.faqs, (faq) => {
        _push(`<div class="group relative bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 rounded-lg border border-amber-200 hover:border-amber-300 transition-all duration-200 hover:shadow-md" data-v-7fe9ccff><a${ssrRenderAttr("href", _ctx.route("faq"))} target="_blank" class="block p-4 h-full" data-v-7fe9ccff><div class="flex items-start justify-between" data-v-7fe9ccff><div class="flex-1 min-w-0" data-v-7fe9ccff><h4 class="font-semibold text-gray-900 group-hover:text-amber-700 transition-colors duration-200 mb-2 line-clamp-2" data-v-7fe9ccff>${ssrInterpolate(faq.name)}</h4><p class="text-sm text-gray-600 group-hover:text-gray-700 line-clamp-3" data-v-7fe9ccff>${ssrInterpolate($options.truncate(faq.details, 170))}</p></div><svg class="w-5 h-5 text-amber-400 group-hover:text-amber-600 transition-colors duration-200 ml-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7fe9ccff><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-v-7fe9ccff></path></svg></div></a></div>`);
      });
      _push(`<!--]--></div></div>`);
    } else {
      _push(`<!---->`);
    }
    if ($data.suggestions.knowledge_base.length) {
      _push(`<div class="space-y-4" data-v-7fe9ccff><div class="flex items-center space-x-2 pb-3 border-b border-gray-100" data-v-7fe9ccff><svg class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" data-v-7fe9ccff><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-7fe9ccff></path></svg><h3 class="text-lg font-bold text-gray-800" data-v-7fe9ccff>Knowledge Base</h3><span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full" data-v-7fe9ccff>${ssrInterpolate($data.suggestions.knowledge_base.length)}</span></div><div class="flex flex-wrap gap-4" data-v-7fe9ccff><!--[-->`);
      ssrRenderList($data.suggestions.knowledge_base, (kb) => {
        _push(`<div class="group relative bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-lg border border-blue-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md" data-v-7fe9ccff><a${ssrRenderAttr("href", _ctx.route("kb.details", kb.id))} target="_blank" class="block p-4 h-full" data-v-7fe9ccff><div class="flex items-start justify-between" data-v-7fe9ccff><div class="flex-1 min-w-0" data-v-7fe9ccff><h4 class="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200 mb-2 line-clamp-2" data-v-7fe9ccff>${ssrInterpolate(kb.title)}</h4><p class="text-sm text-gray-600 group-hover:text-gray-700 line-clamp-3" data-v-7fe9ccff>${ssrInterpolate($options.truncate(kb.details, 170))}</p></div><svg class="w-5 h-5 text-blue-400 group-hover:text-blue-600 transition-colors duration-200 ml-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7fe9ccff><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-v-7fe9ccff></path></svg></div></a></div>`);
      });
      _push(`<!--]--></div></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="pr-6 pb-8 w-full" data-v-7fe9ccff><label class="form-label" data-v-7fe9ccff>Request Details:</label>`);
  _push(ssrRenderComponent(_component_QuillEditor, {
    theme: "snow",
    toolbar: "full",
    content: $data.form.details,
    "onUpdate:content": ($event) => $data.form.details = $event,
    contentType: "html"
  }, null, _parent));
  _push(`</div><input type="file" accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf, .zip" class="hidden" multiple="multiple" data-v-7fe9ccff><div class="pr-6 pb-8 w-full lg:w-full flex-col" data-v-7fe9ccff><button type="button" class="btn flex justify-center items-center" data-v-7fe9ccff>`);
  _push(ssrRenderComponent(_component_icon, {
    name: "file",
    class: "flex-shrink-0 h-8 fill-gray-400 pr-1"
  }, null, _parent));
  _push(`<h4 data-v-7fe9ccff>${ssrInterpolate(_ctx.$t("Attach files"))}</h4></button>`);
  if ($data.form.files.length) {
    _push(`<!--[-->`);
    ssrRenderList($data.form.files, (file, fi) => {
      _push(`<div class="flex items-center justify-between pr-6 pt-8 w-full lg:w-1/2" data-v-7fe9ccff><div class="flex-1 pr-1" data-v-7fe9ccff>${ssrInterpolate(file.name)} <span class="text-gray-500 text-xs" data-v-7fe9ccff>(${ssrInterpolate($options.getFileSize(file.size))})</span></div><button type="button" class="btn flex justify-center items-center" data-v-7fe9ccff>${ssrInterpolate(_ctx.$t("Remove"))}</button></div>`);
    });
    _push(`<!--]-->`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div><div class="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-end items-center" data-v-7fe9ccff>`);
  _push(ssrRenderComponent(_component_loading_button, {
    loading: $data.form.processing,
    class: "btn-indigo",
    type: "submit"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate(_ctx.$t("Create"))} ${ssrInterpolate(_ctx.$t("Ticket"))}`);
      } else {
        return [
          createTextVNode(toDisplayString(_ctx.$t("Create")) + " " + toDisplayString(_ctx.$t("Ticket")), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></form></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Tickets/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-7fe9ccff"]]);
export {
  Create as default
};
