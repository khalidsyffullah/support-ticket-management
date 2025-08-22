import { L as Layout } from "./Layout-MMt3N2fy.js";
import { T as TextInput } from "./TextInput-DD86V4Y6.js";
import { S as SelectInput } from "./SelectInput-M1wEP0ef.js";
import { T as TextareaInput } from "./TextareaInput-CsKB0Ez_.js";
import { L as LoadingButton } from "./LoadingButton-C_hDdjdK.js";
import { F as FileInput } from "./FileInput-Y3725sIq.js";
import { Head, Link } from "@inertiajs/vue3";
import { QuillEditor } from "@vueup/vue-quill";
/* empty css                        */
import { resolveComponent, withCtx, createVNode, createBlock, toDisplayString, openBlock, Fragment, renderList, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "./FlashMessages-BlPv0OK4.js";
import "./Dropdown-BYTnKJ1e.js";
import "@popperjs/core";
import "moment";
import "laravel-vue-i18n";
import "axios";
import "@heroicons/vue/24/outline";
import "uuid";
const _sfc_main = {
  metaInfo: { title: "Create a new post" },
  components: {
    LoadingButton,
    SelectInput,
    TextareaInput,
    TextInput,
    FileInput,
    Link,
    Head,
    QuillEditor
  },
  layout: Layout,
  props: {
    title: String,
    types: Array
  },
  remember: "form",
  data() {
    return {
      form: this.$inertia.form({
        title: null,
        type_id: null,
        image: null,
        details: ""
      })
    };
  },
  methods: {
    store() {
      this.form.post(this.route("posts.store"));
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_text_input = resolveComponent("text-input");
  const _component_select_input = resolveComponent("select-input");
  const _component_QuillEditor = resolveComponent("QuillEditor");
  const _component_file_input = resolveComponent("file-input");
  const _component_loading_button = resolveComponent("loading-button");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_Head, {
    title: _ctx.$t($props.title)
  }, null, _parent));
  _push(`<div class="bg-white rounded-md shadow overflow-hidden max-w-full"><form><div class="p-8 -mr-6 -mb-8 flex flex-wrap">`);
  _push(ssrRenderComponent(_component_text_input, {
    modelValue: $data.form.title,
    "onUpdate:modelValue": ($event) => $data.form.title = $event,
    error: $data.form.errors.title,
    class: "pr-6 pb-8 w-full lg:w-2/3",
    label: _ctx.$t("Title")
  }, null, _parent));
  _push(ssrRenderComponent(_component_select_input, {
    modelValue: $data.form.type_id,
    "onUpdate:modelValue": ($event) => $data.form.type_id = $event,
    error: $data.form.errors.type_id,
    class: "pr-6 pb-8 w-full lg:w-1/3",
    label: _ctx.$t("Type"),
    required: true
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<option${ssrRenderAttr("value", null)}${_scopeId}>${ssrInterpolate(_ctx.$t("Select type"))}</option><!--[-->`);
        ssrRenderList($props.types, (s) => {
          _push2(`<option${ssrRenderAttr("value", s.id)}${_scopeId}>${ssrInterpolate(s.name)}</option>`);
        });
        _push2(`<!--]-->`);
      } else {
        return [
          createVNode("option", { value: null }, toDisplayString(_ctx.$t("Select type")), 1),
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
  _push(`<div class="pr-6 pb-8 w-full"><label class="form-label">${ssrInterpolate(_ctx.$t("Details"))}:</label>`);
  _push(ssrRenderComponent(_component_QuillEditor, {
    theme: "snow",
    toolbar: "full",
    content: $data.form.details,
    "onUpdate:content": ($event) => $data.form.details = $event,
    contentType: "html"
  }, null, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_file_input, {
    modelValue: $data.form.image,
    "onUpdate:modelValue": ($event) => $data.form.image = $event,
    error: $data.form.errors.image,
    class: "pb-8 pr-6 w-full lg:w-1/3",
    type: "file",
    accept: "image/*",
    label: _ctx.$t("Feature image")
  }, null, _parent));
  _push(`</div><div class="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-end items-center">`);
  _push(ssrRenderComponent(_component_loading_button, {
    loading: $data.form.processing,
    class: "btn-indigo",
    type: "submit"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate(_ctx.$t("Create Post"))}`);
      } else {
        return [
          createTextVNode(toDisplayString(_ctx.$t("Create Post")), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Blogs/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Create as default
};
