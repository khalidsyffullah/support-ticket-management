import { Link, Head } from "@inertiajs/vue3";
import { L as Layout } from "./Layout-Bs2SVg2i.js";
import { T as TextInput } from "./TextInput-DD86V4Y6.js";
import { S as SelectInput } from "./SelectInput-M1wEP0ef.js";
import { L as LoadingButton } from "./LoadingButton-C_hDdjdK.js";
import { resolveComponent, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
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
    Head,
    Link,
    LoadingButton,
    SelectInput,
    TextInput
  },
  layout: Layout,
  props: {
    countries: Array,
    title: String
  },
  remember: "form",
  data() {
    return {
      form: this.$inertia.form({
        name: null,
        email: null,
        phone: null,
        address: null,
        city: null,
        region: null,
        country: "BD",
        postal_code: null,
        max_customers: 5
      })
    };
  },
  methods: {
    store() {
      this.form.post(this.route("organizations.store"));
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_text_input = resolveComponent("text-input");
  const _component_select_input = resolveComponent("select-input");
  const _component_loading_button = resolveComponent("loading-button");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_Head, {
    title: _ctx.$t($props.title)
  }, null, _parent));
  _push(`<div class="max-w-full bg-white rounded-md shadow overflow-hidden"><form><div class="flex flex-wrap -mb-8 -mr-6 p-8">`);
  _push(ssrRenderComponent(_component_text_input, {
    modelValue: $data.form.name,
    "onUpdate:modelValue": ($event) => $data.form.name = $event,
    error: $data.form.errors.name,
    class: "pb-8 pr-6 w-full lg:w-1/2",
    label: _ctx.$t("Name"),
    is_required: true
  }, null, _parent));
  _push(ssrRenderComponent(_component_text_input, {
    modelValue: $data.form.email,
    "onUpdate:modelValue": ($event) => $data.form.email = $event,
    error: $data.form.errors.email,
    class: "pb-8 pr-6 w-full lg:w-1/2",
    label: _ctx.$t("Email")
  }, null, _parent));
  _push(ssrRenderComponent(_component_text_input, {
    modelValue: $data.form.phone,
    "onUpdate:modelValue": ($event) => $data.form.phone = $event,
    error: $data.form.errors.phone,
    class: "pb-8 pr-6 w-full lg:w-1/2",
    label: _ctx.$t("Phone")
  }, null, _parent));
  _push(ssrRenderComponent(_component_text_input, {
    modelValue: $data.form.address,
    "onUpdate:modelValue": ($event) => $data.form.address = $event,
    error: $data.form.errors.address,
    class: "pb-8 pr-6 w-full lg:w-1/2",
    label: _ctx.$t("Address"),
    is_required: true
  }, null, _parent));
  _push(ssrRenderComponent(_component_text_input, {
    modelValue: $data.form.city,
    "onUpdate:modelValue": ($event) => $data.form.city = $event,
    error: $data.form.errors.city,
    class: "pb-8 pr-6 w-full lg:w-1/2",
    label: _ctx.$t("City"),
    is_required: true
  }, null, _parent));
  _push(ssrRenderComponent(_component_text_input, {
    modelValue: $data.form.region,
    "onUpdate:modelValue": ($event) => $data.form.region = $event,
    error: $data.form.errors.region,
    class: "pb-8 pr-6 w-full lg:w-1/2",
    label: "Province/State",
    is_required: true
  }, null, _parent));
  _push(ssrRenderComponent(_component_select_input, {
    modelValue: $data.form.country,
    "onUpdate:modelValue": ($event) => $data.form.country = $event,
    error: $data.form.errors.country,
    class: "pb-8 pr-6 w-full lg:w-1/2",
    label: _ctx.$t("Country"),
    disabled: true
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<option value="BD"${_scopeId}>Bangladesh</option>`);
      } else {
        return [
          createVNode("option", { value: "BD" }, "Bangladesh")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_text_input, {
    modelValue: $data.form.postal_code,
    "onUpdate:modelValue": ($event) => $data.form.postal_code = $event,
    error: $data.form.errors.postal_code,
    class: "pb-8 pr-6 w-full lg:w-1/2",
    label: _ctx.$t("Postal code")
  }, null, _parent));
  _push(ssrRenderComponent(_component_text_input, {
    modelValue: $data.form.max_customers,
    "onUpdate:modelValue": ($event) => $data.form.max_customers = $event,
    error: $data.form.errors.max_customers,
    class: "pb-8 pr-6 w-full lg:w-1/2",
    label: _ctx.$t("Maximum Customers"),
    is_required: true
  }, null, _parent));
  _push(`</div><div class="flex items-center justify-end px-8 py-4 bg-gray-50 border-t border-gray-100">`);
  _push(ssrRenderComponent(_component_loading_button, {
    loading: $data.form.processing,
    class: "btn-indigo",
    type: "submit"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate(_ctx.$t("Create Organization"))}`);
      } else {
        return [
          createTextVNode(toDisplayString(_ctx.$t("Create Organization")), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Organizations/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Create as default
};
