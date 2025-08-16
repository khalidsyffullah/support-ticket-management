import { Head } from "@inertiajs/vue3";
import { L as Layout } from "./Layout-CFdxolZR.js";
import { onMounted, onUnmounted, computed, useSSRContext, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, openBlock, createCommentVNode, withDirectives, withModifiers, Fragment, renderList, vModelText, vShow } from "vue";
import { ssrRenderTeleport, ssrRenderStyle, ssrRenderClass, ssrRenderSlot, ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "./FlashMessages-BlPv0OK4.js";
import { L as LoadingButton } from "./LoadingButton-C_hDdjdK.js";
import axios from "axios";
import "./Dropdown-BYTnKJ1e.js";
import "@popperjs/core";
import "moment";
import "laravel-vue-i18n";
import "@heroicons/vue/24/outline";
const _sfc_main$1 = {
  emits: ["close"],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: "2xl"
    },
    closeable: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    show: {
      immediate: true,
      handler: (show) => {
        if (show) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = null;
        }
      }
    }
  },
  setup(props, { emit }) {
    const close = () => {
      if (props.closeable) {
        emit("close");
      }
    };
    const escapeHandler = (e) => {
      if (e.key === "Escape" && props.show) {
        close();
      }
    };
    onMounted(() => document.addEventListener("keydown", escapeHandler));
    onUnmounted(() => {
      document.removeEventListener("keydown", escapeHandler);
      document.body.style.overflow = null;
    });
    const maxWidthClass = computed(() => {
      return {
        "sm": "sm:max-w-sm",
        "md": "sm:max-w-md",
        "lg": "sm:max-w-lg",
        "xl": "sm:max-w-xl",
        "2xl": "sm:max-w-2xl"
      }[props.maxWidth];
    });
    return {
      maxWidthClass,
      close
    };
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  ssrRenderTeleport(_push, (_push2) => {
    _push2(`<div style="${ssrRenderStyle($props.show ? null : { display: "none" })}" class="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50" scroll-on-focus="true"><div style="${ssrRenderStyle($props.show ? null : { display: "none" })}" class="fixed inset-0 transform transition-all"><div class="absolute inset-0 bg-gray-500 opacity-75"></div></div><div style="${ssrRenderStyle($props.show ? null : { display: "none" })}" class="${ssrRenderClass([$setup.maxWidthClass, "mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto"])}">`);
    if ($props.show) {
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
    } else {
      _push2(`<!---->`);
    }
    _push2(`</div></div>`);
  }, "body", false, _parent);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/Modal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Modal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {
  components: {
    Head,
    Modal,
    LoadingButton
  },
  layout: Layout,
  props: {
    departments: Array
  },
  data() {
    return {
      selectedDepartment: null,
      teamMembers: [],
      showAddMemberModal: false,
      showDropdown: false,
      availableUsers: [],
      searchQuery: "",
      selectedUsers: [],
      form: this.$inertia.form({
        user_ids: [],
        team_head: false
      })
    };
  },
  computed: {
    filteredUsers() {
      if (!this.searchQuery) {
        return this.availableUsers;
      }
      const query = this.searchQuery.toLowerCase();
      return this.availableUsers.filter((user) => {
        const name = `${user.first_name} ${user.last_name}`.toLowerCase();
        const email = user.email.toLowerCase();
        return name.includes(query) || email.includes(query);
      });
    }
  },
  methods: {
    async viewMembers(department) {
      this.selectedDepartment = department;
      const response = await axios.get(this.route("departmental_teams.members", department.id));
      this.teamMembers = response.data;
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
      if (this.showDropdown) {
        this.$nextTick(() => {
          if (this.$refs.searchInput) {
            this.$refs.searchInput.focus();
          }
        });
      }
    },
    toggleUserSelection(user) {
      const index = this.selectedUsers.findIndex((u) => u.id === user.id);
      if (index > -1) {
        this.selectedUsers.splice(index, 1);
      } else {
        this.selectedUsers.push(user);
      }
      this.form.user_ids = this.selectedUsers.map((u) => u.id);
    },
    removeSelectedUser(user) {
      const index = this.selectedUsers.findIndex((u) => u.id === user.id);
      if (index > -1) {
        this.selectedUsers.splice(index, 1);
        this.form.user_ids = this.selectedUsers.map((u) => u.id);
      }
    },
    isUserSelected(user) {
      return this.selectedUsers.some((u) => u.id === user.id);
    },
    selectUser(user) {
      this.selectedUser = user;
      this.form.user_id = user.id;
      this.showDropdown = false;
      this.searchQuery = "";
    },
    closeAddMemberModal() {
      this.showAddMemberModal = false;
      this.showDropdown = false;
      this.selectedUsers = [];
      this.searchQuery = "";
      this.form.reset();
    },
    onSearchInput() {
      if (!this.showDropdown) {
        this.showDropdown = true;
      }
    },
    handleClickOutside(event) {
      if (this.$refs.dropdownContainer && !this.$refs.dropdownContainer.contains(event.target)) {
        this.showDropdown = false;
      }
    },
    async addMember() {
      if (!this.selectedDepartment || this.selectedUsers.length === 0) return;
      await this.form.post(this.route("departmental_teams.add_member", this.selectedDepartment.id), {
        onSuccess: () => {
          this.closeAddMemberModal();
          this.viewMembers(this.selectedDepartment);
          this.$page.props.flash.success = `${this.selectedUsers.length} team member(s) added successfully.`;
        },
        onError: (errors) => {
          console.error(errors);
        }
      });
    },
    async removeMember(member) {
      if (!confirm("Are you sure you want to remove this member?")) return;
      await this.$inertia.delete(this.route("departmental_teams.remove_member", { department: this.selectedDepartment.id, user: member.id }), {
        onSuccess: () => {
          this.viewMembers(this.selectedDepartment);
          this.$page.props.flash.success = "Team member removed successfully.";
        },
        onError: (errors) => {
          console.error(errors);
        }
      });
    },
    async fetchAvailableUsers() {
      try {
        const response = await axios.get(this.route("departmental_teams.users"));
        this.availableUsers = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async updateTeamHead(member, isTeamHead) {
      await this.$inertia.put(this.route("departmental_teams.update_head", { department: this.selectedDepartment.id, user: member.id }), { team_head: isTeamHead }, {
        onSuccess: () => {
          this.viewMembers(this.selectedDepartment);
          this.$page.props.flash.success = "Team head updated successfully.";
        },
        onError: (errors) => {
          console.error(errors);
        }
      });
    }
  },
  created() {
    this.fetchAvailableUsers();
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_Modal = resolveComponent("Modal");
  const _component_loading_button = resolveComponent("loading-button");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 py-8" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_Head, {
    title: _ctx.$t("Departmental Teams")
  }, null, _parent));
  _push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="mb-8"><h1 class="text-4xl font-bold text-gray-900">${ssrInterpolate(_ctx.$t("Departmental Teams"))}</h1><p class="mt-2 text-lg text-gray-600">${ssrInterpolate(_ctx.$t("Manage your organizational departments and team members"))}</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"><!--[-->`);
  ssrRenderList($props.departments, (department) => {
    _push(`<div class="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-indigo-300"><div class="p-6"><div class="flex items-center justify-between mb-4"><div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg></div><div class="text-right"><div class="text-2xl font-bold text-indigo-600">${ssrInterpolate(department.users_count)}</div><div class="text-xs text-gray-500 uppercase tracking-wide">${ssrInterpolate(_ctx.$t("Members"))}</div></div></div><h3 class="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">${ssrInterpolate(department.name)}</h3><button class="w-full mt-4 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 font-medium shadow-md hover:shadow-lg">${ssrInterpolate(_ctx.$t("View Members"))}</button></div></div>`);
  });
  _push(`<!--]--></div>`);
  if ($data.selectedDepartment) {
    _push(`<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"><div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8"><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between"><div class="mb-4 sm:mb-0"><h2 class="text-2xl font-bold text-white">${ssrInterpolate($data.selectedDepartment.name)}</h2><p class="text-indigo-100 mt-1">${ssrInterpolate(_ctx.$t("Team Members Management"))}</p></div><button class="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-50 font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> ${ssrInterpolate(_ctx.$t("Add New Team Member"))}</button></div></div><div class="overflow-x-auto"><table class="w-full"><thead class="bg-gray-50 border-b border-gray-200"><tr><th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">${ssrInterpolate(_ctx.$t("Member"))}</th><th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">${ssrInterpolate(_ctx.$t("Email"))}</th><th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">${ssrInterpolate(_ctx.$t("Team Head"))}</th><th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">${ssrInterpolate(_ctx.$t("Actions"))}</th></tr></thead><tbody class="divide-y divide-gray-200"><!--[-->`);
    ssrRenderList($data.teamMembers, (member) => {
      _push(`<tr class="hover:bg-gray-50 transition-colors duration-150"><td class="px-6 py-4 whitespace-nowrap"><div class="flex items-center"><div class="flex-shrink-0 h-10 w-10"><div class="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"><span class="text-white font-medium text-sm">${ssrInterpolate(member.first_name.charAt(0))}${ssrInterpolate(member.last_name.charAt(0))}</span></div></div><div class="ml-4"><div class="text-sm font-medium text-gray-900">${ssrInterpolate(member.first_name)} ${ssrInterpolate(member.last_name)}</div></div></div></td><td class="px-6 py-4 whitespace-nowrap"><div class="text-sm text-gray-600">${ssrInterpolate(member.email)}</div></td><td class="px-6 py-4 whitespace-nowrap"><label class="flex items-center cursor-pointer"><input type="checkbox"${ssrIncludeBooleanAttr(member.pivot.team_head) ? " checked" : ""} class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors"><span class="ml-2 text-sm text-gray-700">${ssrInterpolate(member.pivot.team_head ? _ctx.$t("Yes") : _ctx.$t("No"))}</span></label></td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium"><button class="inline-flex items-center px-3 py-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors duration-150"><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg> ${ssrInterpolate(_ctx.$t("Remove"))}</button></td></tr>`);
    });
    _push(`<!--]-->`);
    if ($data.teamMembers.length === 0) {
      _push(`<tr><td colspan="4" class="px-6 py-12 text-center"><div class="flex flex-col items-center"><svg class="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg><h3 class="text-lg font-medium text-gray-900 mb-1">${ssrInterpolate(_ctx.$t("No team members"))}</h3><p class="text-gray-500">${ssrInterpolate(_ctx.$t("Get started by adding your first team member."))}</p></div></td></tr>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</tbody></table></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
  _push(ssrRenderComponent(_component_Modal, {
    show: $data.showAddMemberModal,
    onClose: $options.closeAddMemberModal
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="bg-white"${_scopeId}><div class="flex items-center justify-between p-6 border-b border-gray-200"${_scopeId}><h3 class="text-xl font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.$t("Add Team Member"))}</h3><button class="text-gray-400 hover:text-gray-600 transition-colors"${_scopeId}><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div><div class="p-6"${_scopeId}><div class="mb-6"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>${ssrInterpolate(_ctx.$t("Select User"))}</label><div class="relative"${_scopeId}><button type="button" class="${ssrRenderClass([{ "border-red-300 focus:ring-red-500 focus:border-red-500": $data.form.errors.user_ids }, "relative w-full bg-white border border-gray-300 rounded-lg shadow-sm pl-3 pr-10 py-3 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all min-h-[48px]"])}"${_scopeId}>`);
        if ($data.selectedUsers.length > 0) {
          _push2(`<div class="flex flex-wrap gap-1"${_scopeId}><!--[-->`);
          ssrRenderList($data.selectedUsers, (user) => {
            _push2(`<span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800"${_scopeId}>${ssrInterpolate(user.first_name)} ${ssrInterpolate(user.last_name)} <button class="ml-1 inline-flex items-center justify-center w-4 h-4 text-indigo-400 hover:text-indigo-600"${_scopeId}><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></span>`);
          });
          _push2(`<!--]--></div>`);
        } else {
          _push2(`<span class="block truncate text-gray-500"${_scopeId}>${ssrInterpolate(_ctx.$t("Select users"))}</span>`);
        }
        _push2(`<span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"${_scopeId}><svg class="${ssrRenderClass([{ "rotate-180": $data.showDropdown }, "h-5 w-5 text-gray-400 transition-transform"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"${_scopeId}></path></svg></span></button><div style="${ssrRenderStyle($data.showDropdown ? null : { display: "none" })}" class="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none"${_scopeId}><div class="sticky top-0 bg-white p-2 border-b border-gray-200"${_scopeId}><div class="relative"${_scopeId}><input${ssrRenderAttr("value", $data.searchQuery)} type="text"${ssrRenderAttr("placeholder", _ctx.$t("Search by name or email..."))} class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"${_scopeId}><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"${_scopeId}><svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"${_scopeId}></path></svg></div></div></div>`);
        if ($options.filteredUsers.length === 0) {
          _push2(`<div class="px-4 py-3 text-sm text-gray-500 text-center"${_scopeId}>${ssrInterpolate($data.searchQuery ? _ctx.$t("No users found matching your search") : _ctx.$t("No users available"))}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<!--[-->`);
        ssrRenderList($options.filteredUsers, (user) => {
          _push2(`<div class="${ssrRenderClass([$options.isUserSelected(user) ? "bg-indigo-50 border-indigo-500" : "border-transparent", "w-full text-left px-4 py-3 text-sm hover:bg-indigo-50 focus:bg-indigo-50 focus:outline-none transition-colors cursor-pointer border-l-4"])}"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0 mr-3"${_scopeId}><div class="${ssrRenderClass([$options.isUserSelected(user) ? "bg-indigo-600 border-indigo-600" : "border-gray-300", "w-4 h-4 border-2 rounded transition-all"])}"${_scopeId}>`);
          if ($options.isUserSelected(user)) {
            _push2(`<svg class="w-3 h-3 text-white ml-0.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"${_scopeId}></path></svg>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div><div class="flex-shrink-0 h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-3"${_scopeId}><span class="text-white text-xs font-medium"${_scopeId}>${ssrInterpolate(user.first_name.charAt(0))}${ssrInterpolate(user.last_name.charAt(0))}</span></div><div class="flex-1 min-w-0"${_scopeId}><p class="text-sm font-medium text-gray-900 truncate"${_scopeId}>${ssrInterpolate(user.first_name)} ${ssrInterpolate(user.last_name)}</p><p class="text-sm text-gray-500 truncate"${_scopeId}>${ssrInterpolate(user.email)}</p></div></div></div>`);
        });
        _push2(`<!--]--></div></div>`);
        if ($data.form.errors.user_ids) {
          _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate($data.form.errors.user_ids)}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div></div><div class="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl"${_scopeId}><button type="button" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"${_scopeId}>${ssrInterpolate(_ctx.$t("Cancel"))}</button>`);
        _push2(ssrRenderComponent(_component_loading_button, {
          loading: $data.form.processing,
          disabled: $data.selectedUsers.length === 0,
          onClick: $options.addMember,
          class: "px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all shadow-md"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`${ssrInterpolate($data.selectedUsers.length > 0 ? _ctx.$t(`Add ${$data.selectedUsers.length} Member(s)`) : _ctx.$t("Add Members"))}`);
            } else {
              return [
                createTextVNode(toDisplayString($data.selectedUsers.length > 0 ? _ctx.$t(`Add ${$data.selectedUsers.length} Member(s)`) : _ctx.$t("Add Members")), 1)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div></div>`);
      } else {
        return [
          createVNode("div", { class: "bg-white" }, [
            createVNode("div", { class: "flex items-center justify-between p-6 border-b border-gray-200" }, [
              createVNode("h3", { class: "text-xl font-semibold text-gray-900" }, toDisplayString(_ctx.$t("Add Team Member")), 1),
              createVNode("button", {
                onClick: $options.closeAddMemberModal,
                class: "text-gray-400 hover:text-gray-600 transition-colors"
              }, [
                (openBlock(), createBlock("svg", {
                  class: "w-6 h-6",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M6 18L18 6M6 6l12 12"
                  })
                ]))
              ], 8, ["onClick"])
            ]),
            createVNode("div", { class: "p-6" }, [
              createVNode("div", { class: "mb-6" }, [
                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, toDisplayString(_ctx.$t("Select User")), 1),
                createVNode("div", {
                  class: "relative",
                  ref: "dropdownContainer"
                }, [
                  createVNode("button", {
                    onClick: withModifiers($options.toggleDropdown, ["stop"]),
                    type: "button",
                    class: ["relative w-full bg-white border border-gray-300 rounded-lg shadow-sm pl-3 pr-10 py-3 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all min-h-[48px]", { "border-red-300 focus:ring-red-500 focus:border-red-500": $data.form.errors.user_ids }]
                  }, [
                    $data.selectedUsers.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex flex-wrap gap-1"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList($data.selectedUsers, (user) => {
                        return openBlock(), createBlock("span", {
                          key: user.id,
                          class: "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800"
                        }, [
                          createTextVNode(toDisplayString(user.first_name) + " " + toDisplayString(user.last_name) + " ", 1),
                          createVNode("button", {
                            onClick: withModifiers(($event) => $options.removeSelectedUser(user), ["stop"]),
                            class: "ml-1 inline-flex items-center justify-center w-4 h-4 text-indigo-400 hover:text-indigo-600"
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-3 h-3",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M6 18L18 6M6 6l12 12"
                              })
                            ]))
                          ], 8, ["onClick"])
                        ]);
                      }), 128))
                    ])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "block truncate text-gray-500"
                    }, toDisplayString(_ctx.$t("Select users")), 1)),
                    createVNode("span", { class: "absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none" }, [
                      (openBlock(), createBlock("svg", {
                        class: ["h-5 w-5 text-gray-400 transition-transform", { "rotate-180": $data.showDropdown }],
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M19 9l-7 7-7-7"
                        })
                      ], 2))
                    ])
                  ], 10, ["onClick"]),
                  withDirectives(createVNode("div", {
                    onClick: withModifiers(() => {
                    }, ["stop"]),
                    class: "absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none"
                  }, [
                    createVNode("div", { class: "sticky top-0 bg-white p-2 border-b border-gray-200" }, [
                      createVNode("div", { class: "relative" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => $data.searchQuery = $event,
                          ref: "searchInput",
                          type: "text",
                          placeholder: _ctx.$t("Search by name or email..."),
                          class: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm",
                          onClick: withModifiers(() => {
                          }, ["stop"]),
                          onInput: $options.onSearchInput
                        }, null, 40, ["onUpdate:modelValue", "placeholder", "onClick", "onInput"]), [
                          [vModelText, $data.searchQuery]
                        ]),
                        createVNode("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
                          (openBlock(), createBlock("svg", {
                            class: "h-4 w-4 text-gray-400",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            })
                          ]))
                        ])
                      ])
                    ]),
                    $options.filteredUsers.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "px-4 py-3 text-sm text-gray-500 text-center"
                    }, toDisplayString($data.searchQuery ? _ctx.$t("No users found matching your search") : _ctx.$t("No users available")), 1)) : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList($options.filteredUsers, (user) => {
                      return openBlock(), createBlock("div", {
                        key: user.id,
                        onClick: ($event) => $options.toggleUserSelection(user),
                        class: ["w-full text-left px-4 py-3 text-sm hover:bg-indigo-50 focus:bg-indigo-50 focus:outline-none transition-colors cursor-pointer border-l-4", $options.isUserSelected(user) ? "bg-indigo-50 border-indigo-500" : "border-transparent"]
                      }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0 mr-3" }, [
                            createVNode("div", {
                              class: ["w-4 h-4 border-2 rounded transition-all", $options.isUserSelected(user) ? "bg-indigo-600 border-indigo-600" : "border-gray-300"]
                            }, [
                              $options.isUserSelected(user) ? (openBlock(), createBlock("svg", {
                                key: 0,
                                class: "w-3 h-3 text-white ml-0.5 mt-0.5",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "3",
                                  d: "M5 13l4 4L19 7"
                                })
                              ])) : createCommentVNode("", true)
                            ], 2)
                          ]),
                          createVNode("div", { class: "flex-shrink-0 h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-3" }, [
                            createVNode("span", { class: "text-white text-xs font-medium" }, toDisplayString(user.first_name.charAt(0)) + toDisplayString(user.last_name.charAt(0)), 1)
                          ]),
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode("p", { class: "text-sm font-medium text-gray-900 truncate" }, toDisplayString(user.first_name) + " " + toDisplayString(user.last_name), 1),
                            createVNode("p", { class: "text-sm text-gray-500 truncate" }, toDisplayString(user.email), 1)
                          ])
                        ])
                      ], 10, ["onClick"]);
                    }), 128))
                  ], 8, ["onClick"]), [
                    [vShow, $data.showDropdown]
                  ])
                ], 512),
                $data.form.errors.user_ids ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mt-1 text-sm text-red-600"
                }, toDisplayString($data.form.errors.user_ids), 1)) : createCommentVNode("", true)
              ])
            ]),
            createVNode("div", { class: "flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl" }, [
              createVNode("button", {
                onClick: $options.closeAddMemberModal,
                type: "button",
                class: "px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              }, toDisplayString(_ctx.$t("Cancel")), 9, ["onClick"]),
              createVNode(_component_loading_button, {
                loading: $data.form.processing,
                disabled: $data.selectedUsers.length === 0,
                onClick: $options.addMember,
                class: "px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all shadow-md"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString($data.selectedUsers.length > 0 ? _ctx.$t(`Add ${$data.selectedUsers.length} Member(s)`) : _ctx.$t("Add Members")), 1)
                ]),
                _: 1
              }, 8, ["loading", "disabled", "onClick"])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/DepartmentalTeams/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Index as default
};
