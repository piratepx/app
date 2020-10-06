<template>
  <the-layout>
    <template v-if="currentProject" #nav>
      <li>
        <router-link
          :to="`/${currentProject.secret}/settings`"
          class="text-gray-600 hover:text-gray-900 p-3"
          active-class="text-gray-900"
          title="Settings"
        >
          <base-icon-settings :width="24" :height="24" />
        </router-link>
      </li>
    </template>

    <template v-if="!currentProject">
      <base-center v-if="isFetching">Loading...</base-center>
      <base-center v-if="isError">
        <base-alert error>Whoops! Something went wrong.</base-alert>
      </base-center>
    </template>
    <router-view v-if="currentProject" />
  </the-layout>
</template>

<script>
import BaseAlert from '/@/components/base/BaseAlert.vue'
import BaseCenter from '/@/components/base/BaseCenter.vue'
import BaseIconSettings from '/@/components/base/BaseIconSettings.vue'
import {
  STATUS_ERROR,
  STATUS_FETCHING,
} from '/@/store/modules/projects/current'
import TheLayout from '/@/components/the/TheLayout.vue'

export default {
  components: {
    BaseAlert,
    BaseCenter,
    BaseIconSettings,
    TheLayout,
  },
  props: {
    currentProject: {
      type: Object,
      default: null,
    },
    status: {
      type: String,
      required: true,
    },
  },
  computed: {
    isError() {
      return this.status === STATUS_ERROR
    },
    isFetching() {
      return this.status === STATUS_FETCHING
    },
  },
}
</script>
