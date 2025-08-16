import { Head, Link } from "@inertiajs/vue3";
import { L as Layout } from "./Layout-CFdxolZR.js";
import { T as TextInput } from "./TextInput-DD86V4Y6.js";
import { L as LoadingButton } from "./LoadingButton-C_hDdjdK.js";
import { QuillEditor } from "@vueup/vue-quill";
/* empty css                        */
import { resolveComponent, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
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
  metaInfo: { title: "Contact" },
  components: {
    Link,
    Head,
    TextInput,
    LoadingButton,
    QuillEditor
  },
  layout: Layout,
  props: {
    page: Object
  },
  remember: "form",
  data() {
    return {
      tabs: [
        { "name": "Overview", "active": true },
        { "name": "List Information", "active": false },
        { "name": "Bottom", "active": false }
      ],
      form: this.$inertia.form({
        title: "Terms of Services",
        slug: "terms",
        is_active: this.page.is_active,
        html: JSON.parse(this.page.html)
      })
    };
  },
  methods: {
    update() {
      this.form.put(this.route("front_pages.update", "terms"));
    },
    uploader(editor) {
      editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return new UploadAdapter(loader);
      };
    },
    activeTab(index) {
      for (const tab_item of this.tabs) {
        tab_item.active = false;
      }
      this.tabs[index].active = true;
    }
  },
  mounted() {
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_text_input = resolveComponent("text-input");
  const _component_QuillEditor = resolveComponent("QuillEditor");
  const _component_loading_button = resolveComponent("loading-button");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_Head, {
    title: _ctx.$t("terms_of_services")
  }, null, _parent));
  _push(`<div class="bg-white rounded-md shadow overflow-hidden mr-2"><form><div class="p-8 -mr-6 -mb-8 flex flex-wrap">`);
  _push(ssrRenderComponent(_component_text_input, {
    modelValue: $data.form.html.title,
    "onUpdate:modelValue": ($event) => $data.form.html.title = $event,
    class: "pr-6 pb-8 w-full lg:w-1/2",
    label: _ctx.$t("Title")
  }, null, _parent));
  _push(`<div class="pr-6 pb-8 w-full"><label class="form-label">Page Content:</label>`);
  _push(ssrRenderComponent(_component_QuillEditor, {
    theme: "snow",
    toolbar: "full",
    content: $data.form.html.content,
    "onUpdate:content": ($event) => $data.form.html.content = $event,
    contentType: "html"
  }, null, _parent));
  _push(`</div></div><div class="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center">`);
  _push(ssrRenderComponent(_component_loading_button, {
    loading: $data.form.processing,
    class: "btn-indigo ml-auto",
    type: "submit"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate(_ctx.$t("Save"))}`);
      } else {
        return [
          createTextVNode(toDisplayString(_ctx.$t("Save")), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FrontPages/TermsOfServices.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TermsOfServices = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  TermsOfServices as default
};
