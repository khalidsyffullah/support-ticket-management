<template>
  <div>
    <Head :title="title" />
    <div class="flex items-center justify-between mb-6 gap-4">
      <search-input v-model="form.search" class="w-full max-w-md" @reset="resetSearch"></search-input>
      <select-input v-model="form.parent_id" class="w-full max-w-xs" :label="$t('Filter by Parent')">
        <option :value="null">{{ $t('All Organizations') }}</option>
        <option v-for="org in parent_organizations" :key="org.id" :value="org.id">
          {{ org.name }}
        </option>
      </select-input>
      <!-- <button
        v-if="form.search || form.parent_id"
        @click="resetFilters"
        class="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded whitespace-nowrap"
      >
        {{ $t('Reset Filters') }}
      </button> -->
      <Link class="btn-indigo whitespace-nowrap" :href="route('organizations.create')">
        <span>{{ $t('Create') }}</span>
        <span class="hidden md:inline"> {{ $t('Organization') }} </span>
      </Link>
    </div>

    <div v-if="parent_id" class="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md flex items-center justify-between">
      <p class="text-sm text-gray-700">
        Viewing sub-organizations of: <strong>{{ current_parent.name }}</strong>
      </p>
      <button @click="clearFilter" class="text-blue-600 hover:underline text-sm font-medium">
        Clear Filter
      </button>
    </div>

    <div class="bg-white rounded-md shadow overflow-x-auto">
      <table class="w-full whitespace-nowrap">
        <thead>
          <tr class="text-left font-bold">
            <th class="pb-4 pt-6 px-6">{{ $t('Name') }}</th>
            <th class="pb-4 pt-6 px-6">{{ $t('Parent Organization') }}</th>
            <th class="pb-4 pt-6 px-6">{{ $t('Sub-Organizations') }}</th>
            <th class="pb-4 pt-6 px-6">{{ $t('City') }}</th>
            <th class="pb-4 pt-6 px-6" colspan="2">{{ $t('Phone') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="organization in organizations.data" :key="organization.id" class="hover:bg-gray-100 focus-within:bg-gray-100">
            <td class="border-t">
              <Link class="flex items-center px-6 py-4 focus:text-indigo-500" :href="route('organizations.edit', organization.id)">
                {{ organization.name }}
              </Link>
            </td>
            <td class="border-t">
              <div v-if="organization.parent" class="flex items-center px-6 py-4">
                <button
                  @click="filterByParent(organization.parent.id)"
                  class="text-indigo-600 hover:underline"
                >
                  {{ organization.parent.name }}
                </button>
              </div>
              <div v-else class="px-6 py-4 text-gray-500 text-sm">
                —
              </div>
            </td>
            <td class="border-t">
              <div v-if="organization.has_children" class="flex items-center px-6 py-4">
                <button
                  @click="filterByParent(organization.id)"
                  class="text-indigo-600 hover:underline"
                >
                  {{ organization.children_count }} sub-org(s)
                </button>
              </div>
              <div v-else class="px-6 py-4 text-gray-500 text-sm">
                —
              </div>
            </td>
            <td class="border-t">
              <Link class="flex items-center px-6 py-4" :href="route('organizations.edit', organization.id)" tabindex="-1">
                {{ organization.city }}
              </Link>
            </td>
            <td class="border-t">
              <Link class="flex items-center px-6 py-4" :href="route('organizations.edit', organization.id)" tabindex="-1">
                {{ organization.phone }}
              </Link>
            </td>
            <td class="w-px border-t">
              <Link class="flex items-center px-4" :href="route('organizations.edit', organization.id)" tabindex="-1">
                <icon name="cheveron-right" class="block w-6 h-6 fill-gray-400" />
              </Link>
            </td>
          </tr>
          <tr v-if="organizations.data.length === 0">
            <td class="px-6 py-4 border-t" colspan="6">{{ $t('No organizations found.') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination class="mt-6" :links="organizations.links" />
  </div>
</template>

<script>
import { Head, Link } from '@inertiajs/vue3'
import Icon from '@/Shared/Icon.vue'
import pickBy from 'lodash/pickBy'
import Layout from '@/Shared/Layout.vue'
import throttle from 'lodash/throttle'
import mapValues from 'lodash/mapValues'
import Pagination from '@/Shared/Pagination.vue'
import SearchInput from '@/Shared/SearchInput.vue'
import SelectInput from '@/Shared/SelectInput.vue'

export default {
  components: {
    SearchInput,
    SelectInput,
    Head,
    Icon,
    Link,
    Pagination,
  },
  layout: Layout,
  props: {
    filters: Object,
    organizations: Object,
    parent_organizations: Array,
    current_parent: Object,
    parent_id: String,
    title: String,
  },
  data() {
    return {
      form: {
        search: this.filters.search,
        parent_id: this.filters.parent_id,
      },
    }
  },
  watch: {
    form: {
      deep: true,
      handler: throttle(function () {
        this.$inertia.get(this.route('organizations'), pickBy(this.form), { preserveState: true })
      }, 150),
    },
  },
  methods: {
    resetSearch() {
      this.form.search = null
    },
    clearFilter() {
      this.form.parent_id = null
    },
    filterByParent(parentId) {
      this.form.parent_id = parentId
    },
  },
}
</script>
