<template>
  <div class="max-w-lg mx-auto space-y-10">
    <div class="text-center">
      <base-button :to="`/${record.secret}`">
        <base-icon-chevron-left />
        <span>Back to Dashboard</span>
      </base-button>
    </div>
    <div class="space-y-5">
      <div>
        <div class="mb-1">Project ID</div>
        <div
          class="bg-gray-300 border-2 border-gray-400 px-3 py-1 cursor-text select-all whitespace-no-wrap overflow-x-auto"
        >
          {{ record.id }}
        </div>
      </div>
      <div>
        <div class="mb-1">Project Secret</div>
        <div
          class="bg-gray-300 border-2 border-gray-400 px-3 py-1 cursor-text select-all whitespace-no-wrap overflow-x-auto"
        >
          {{ record.secret }}
        </div>
      </div>
      <project-form
        :record="record"
        :status="status"
        :time-zones="timeZones"
        :time-zones-status="timeZonesStatus"
        @update="$emit('update', $event)"
        @save="$emit('save')"
      />
    </div>
    <div class="space-y-5">
      <h2 class="text-lg font-semibold text-center">Shared Access</h2>
      <p>
        If you want to share your Dashboard publicly, or just with a few
        friends, a read-only version with a separate URL can be enabled just for
        that purpose.
      </p>
      <p>
        <template v-if="record.shared_secret">
          It is currently <strong>Enabled</strong>:
        </template>
        <template v-if="!record.shared_secret">
          It is currently <strong>Disabled</strong>.
        </template>
      </p>
      <div
        v-if="record.shared_secret"
        class="bg-gray-300 border-2 border-gray-400 px-3 py-1 cursor-text select-all whitespace-no-wrap overflow-x-auto"
      >
        {{ sharedURL }}
      </div>
      <form @submit.prevent="$emit('toggle-shared')">
        <base-button type="submit" primary :disabled="isSharedToggleDisabled">
          {{ record.shared_secret ? 'Disable' : 'Enable' }}
        </base-button>
      </form>
    </div>
  </div>
</template>

<script>
import BaseButton from '/@/components/base/BaseButton.vue'
import BaseIconChevronLeft from '/@/components/base/BaseIconChevronLeft.vue'
import ProjectForm from '/@/components/project/ProjectForm.vue'
import { STATUS_SAVING } from '/@/store/modules/projects/current'

export default {
  components: {
    BaseButton,
    BaseIconChevronLeft,
    ProjectForm,
  },
  props: {
    record: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: null,
    },
    timeZones: {
      type: Array,
      default: null,
    },
    timeZonesStatus: {
      type: String,
      default: null,
    },
  },
  emits: ['save', 'toggle-shared', 'update'],
  computed: {
    isSharedToggleDisabled() {
      return this.isSaving
    },
    isSaving() {
      return this.status === STATUS_SAVING
    },
    sharedURL() {
      if (!this.record.shared_secret) {
        return null
      }

      return `${window.location.origin}/shared/${this.record.shared_secret}`
    },
  },
}
</script>
