import { Link, Head } from "@inertiajs/vue3";
import { L as Layout } from "./Layout-MMt3N2fy.js";
import { T as TextInput } from "./TextInput-DD86V4Y6.js";
import { F as FileInput } from "./FileInput-Y3725sIq.js";
import { S as SelectInput } from "./SelectInput-M1wEP0ef.js";
import { L as LoadingButton } from "./LoadingButton-C_hDdjdK.js";
import { resolveComponent, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./FlashMessages-BlPv0OK4.js";
import "./Dropdown-BYTnKJ1e.js";
import "@popperjs/core";
import "moment";
import "laravel-vue-i18n";
import "axios";
import "@heroicons/vue/24/outline";
import "uuid";
const _sfc_main = {
  components: {
    FileInput,
    Head,
    Link,
    LoadingButton,
    SelectInput,
    TextInput
  },
  layout: Layout,
  props: {
    user: Object,
    auth: Object,
    countries: Array,
    organizations: Array,
    cities: Array,
    title: String
  },
  remember: "form",
  data() {
    return {
      user_access: this.$page.props.auth.user.access,
      form: this.$inertia.form({
        _method: "put",
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        phone: this.user.phone,
        city: this.user.city,
        address: this.user.address,
        country_id: this.user.country_id,
        organization_id: this.user.organization_id,
        approval_status: this.user.approval_status,
        password: "",
        photo_path: null
      })
    };
  },
  created() {
  },
  methods: {
    setDefaultValue(arr, key, value) {
      const find = arr.find((i) => i.name.match(new RegExp(value + ".*")));
      if (find) {
        this.form[key] = find["id"];
      }
    },
    update() {
      this.form.post(this.route("customers.update", this.user.id), {
        onSuccess: () => this.form.reset("password", "photo")
      });
    },
    updateApprovalStatus() {
      this.$inertia.put(this.route("customers.updateApprovalStatus", this.user.id), {
        approval_status: this.form.approval_status,
        _method: "put"
      }, {
        preserveScroll: true,
        preserveState: true
      });
    },
    destroy() {
      if (confirm("Are you sure you want to delete this user?")) {
        this.$inertia.delete(this.route("customers.destroy", this.user.id));
      }
    },
    restore() {
      if (confirm("Are you sure you want to restore this user?")) {
        this.$inertia.put(this.route("customers.restore", this.user.id));
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_text_input = resolveComponent("text-input");
  const _component_select_input = resolveComponent("select-input");
  const _component_file_input = resolveComponent("file-input");
  const _component_loading_button = resolveComponent("loading-button");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_Head, { title: $props.title }, null, _parent));
  _push(`<div class="max-w-full bg-white rounded-md shadow overflow-hidden"><form><div class="flex flex-wrap -mb-8 -mr-6 p-8">`);
  _push(ssrRenderComponent(_component_text_input, {
    modelValue: $data.form.first_name,
    "onUpdate:modelValue": ($event) => $data.form.first_name = $event,
    error: $data.form.errors.first_name,
    class: "pb-8 pr-6 w-full lg:w-1/3",
    label: _ctx.$t("First name"),
    is_required: true
  }, null, _parent));
  _push(ssrRenderComponent(_component_text_input, {
    modelValue: $data.form.last_name,
    "onUpdate:modelValue": ($event) => $data.form.last_name = $event,
    error: $data.form.errors.last_name,
    class: "pb-8 pr-6 w-full lg:w-1/3",
    label: _ctx.$t("Last name"),
    is_required: true
  }, null, _parent));
  _push(ssrRenderComponent(_component_text_input, {
    modelValue: $data.form.email,
    "onUpdate:modelValue": ($event) => $data.form.email = $event,
    error: $data.form.errors.email,
    class: "pb-8 pr-6 w-full lg:w-1/3",
    label: _ctx.$t("Email"),
    is_required: true
  }, null, _parent));
  _push(ssrRenderComponent(_component_text_input, {
    modelValue: $data.form.phone,
    "onUpdate:modelValue": ($event) => $data.form.phone = $event,
    error: $data.form.errors.phone,
    class: "pb-8 pr-6 w-full lg:w-1/3",
    label: _ctx.$t("Phone")
  }, null, _parent));
  _push(ssrRenderComponent(_component_text_input, {
    modelValue: $data.form.city,
    "onUpdate:modelValue": ($event) => $data.form.city = $event,
    error: $data.form.errors.city,
    class: "pb-8 pr-6 w-full lg:w-1/3",
    label: _ctx.$t("City")
  }, null, _parent));
  _push(ssrRenderComponent(_component_text_input, {
    modelValue: $data.form.address,
    "onUpdate:modelValue": ($event) => $data.form.address = $event,
    error: $data.form.errors.address,
    class: "pb-8 pr-6 w-full lg:w-1/3",
    label: _ctx.$t("Address")
  }, null, _parent));
  _push(ssrRenderComponent(_component_select_input, {
    modelValue: $data.form.country_id,
    "onUpdate:modelValue": ($event) => $data.form.country_id = $event,
    error: $data.form.errors.country_id,
    class: "pr-6 pb-8 w-full lg:w-1/3",
    label: _ctx.$t("Country")
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<option value="19"${_scopeId}>Bangladesh</option>`);
      } else {
        return [
          createVNode("option", { value: "19" }, "Bangladesh")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_select_input, {
    modelValue: $data.form.organization_id,
    "onUpdate:modelValue": ($event) => $data.form.organization_id = $event,
    error: $data.form.errors.organization_id,
    class: "pr-6 pb-8 w-full lg:w-1/3",
    label: _ctx.$t("Organization"),
    is_required: true
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<option${ssrRenderAttr("value", null)}${_scopeId}></option><!--[-->`);
        ssrRenderList($props.organizations, (o) => {
          _push2(`<option${ssrRenderAttr("value", o.id)}${_scopeId}>${ssrInterpolate(_ctx.$t(o.name))}</option>`);
        });
        _push2(`<!--]-->`);
      } else {
        return [
          createVNode("option", { value: null }),
          (openBlock(true), createBlock(Fragment, null, renderList($props.organizations, (o) => {
            return openBlock(), createBlock("option", {
              key: o.id,
              value: o.id
            }, toDisplayString(_ctx.$t(o.name)), 9, ["value"]);
          }), 128))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_text_input, {
    modelValue: $data.form.password,
    "onUpdate:modelValue": ($event) => $data.form.password = $event,
    error: $data.form.errors.password,
    class: "pb-8 pr-6 w-full lg:w-1/3",
    type: "password",
    autocomplete: "new-password",
    label: _ctx.$t("Password"),
    is_required: true
  }, null, _parent));
  _push(ssrRenderComponent(_component_file_input, {
    modelValue: $data.form.photo_path,
    "onUpdate:modelValue": ($event) => $data.form.photo_path = $event,
    error: $data.form.errors.photo_path,
    class: "pb-8 pr-6 w-full lg:w-1/3",
    type: "file",
    accept: "image/*",
    label: "Photo"
  }, null, _parent));
  _push(`<div class="w-full lg:w-1/3 flex items-center justify-start">`);
  if ($props.user.photo_path) {
    _push(`<img class="block mb-2 w-8 h-8 rounded-full"${ssrRenderAttr("src", $props.user.photo_path)}>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div><div class="flex items-center px-8 py-4 bg-gray-50 border-t border-gray-100">`);
  _push(ssrRenderComponent(_component_select_input, {
    modelValue: $data.form.approval_status,
    "onUpdate:modelValue": ($event) => $data.form.approval_status = $event,
    error: $data.form.errors.approval_status,
    class: "pr-6 pb-8 w-full lg:w-1/3",
    label: _ctx.$t("Approval Status"),
    onChange: $options.updateApprovalStatus
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<option value="pending"${_scopeId}>${ssrInterpolate(_ctx.$t("Pending"))}</option><option value="approved"${_scopeId}>${ssrInterpolate(_ctx.$t("Approved"))}</option><option value="rejected"${_scopeId}>${ssrInterpolate(_ctx.$t("Rejected"))}</option>`);
      } else {
        return [
          createVNode("option", { value: "pending" }, toDisplayString(_ctx.$t("Pending")), 1),
          createVNode("option", { value: "approved" }, toDisplayString(_ctx.$t("Approved")), 1),
          createVNode("option", { value: "rejected" }, toDisplayString(_ctx.$t("Rejected")), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  if ($props.user.id !== $props.auth.user.id && $data.user_access.customer.delete) {
    _push(`<button class="text-red-600 hover:underline" tabindex="-1" type="button">${ssrInterpolate(_ctx.$t("Delete"))}</button>`);
  } else {
    _push(`<!---->`);
  }
  _push(ssrRenderComponent(_component_loading_button, {
    loading: $data.form.processing,
    class: "btn-indigo ml-auto",
    type: "submit"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate(_ctx.$t("Update"))}`);
      } else {
        return [
          createTextVNode(toDisplayString(_ctx.$t("Update")), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Customers/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Edit as default
};
