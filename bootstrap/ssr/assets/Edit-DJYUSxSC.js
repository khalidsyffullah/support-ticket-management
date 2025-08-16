import { Link, Head } from "@inertiajs/vue3";
import { L as Layout } from "./Layout-CFdxolZR.js";
import { T as TextInput } from "./TextInput-DD86V4Y6.js";
import { L as LoadingButton } from "./LoadingButton-C_hDdjdK.js";
import { resolveComponent, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
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
    TextInput
  },
  layout: Layout,
  props: {
    notification: Object,
    title: String
  },
  remember: "form",
  data() {
    return {
      form: this.$inertia.form({
        _method: "put",
        title: this.notification.title,
        content: this.notification.content,
        expires_at: this.notification.expires_at
      })
    };
  },
  methods: {
    update() {
      this.form.post(this.route("notifications.update", this.notification.id));
    },
    destroy() {
      if (confirm("Are you sure you want to delete this notification?")) {
        this.$inertia.delete(this.route("notifications.destroy", this.notification.id));
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_text_input = resolveComponent("text-input");
  const _component_loading_button = resolveComponent("loading-button");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_Head, {
    title: _ctx.$t("Edit Notification")
  }, null, _parent));
  _push(`<div class="max-w-full bg-white rounded-md shadow overflow-hidden"><form><div class="flex flex-wrap -mb-8 -mr-6 p-8">`);
  _push(ssrRenderComponent(_component_text_input, {
    modelValue: $data.form.title,
    "onUpdate:modelValue": ($event) => $data.form.title = $event,
    error: $data.form.errors.title,
    class: "pb-8 pr-6 w-full",
    label: _ctx.$t("Title"),
    is_required: true
  }, null, _parent));
  _push(`<div class="pb-8 pr-6 w-full"><label class="form-label" for="content">${ssrInterpolate(_ctx.$t("Content"))}:</label><textarea id="content" class="${ssrRenderClass([{ "error": $data.form.errors.content }, "form-textarea"])}">${ssrInterpolate($data.form.content)}</textarea>`);
  if ($data.form.errors.content) {
    _push(`<div class="form-error">${ssrInterpolate($data.form.errors.content)}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
  _push(ssrRenderComponent(_component_text_input, {
    modelValue: $data.form.expires_at,
    "onUpdate:modelValue": ($event) => $data.form.expires_at = $event,
    error: $data.form.errors.expires_at,
    class: "pb-8 pr-6 w-full lg:w-1/2",
    type: "datetime-local",
    label: _ctx.$t("Expires At")
  }, null, _parent));
  _push(`</div><div class="flex items-center px-8 py-4 bg-gray-50 border-t border-gray-100"><button class="text-red-600 hover:underline" tabindex="-1" type="button">${ssrInterpolate(_ctx.$t("Delete"))}</button>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/UserNotifications/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Edit as default
};
