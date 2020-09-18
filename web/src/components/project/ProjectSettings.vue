<template>
  <div class="max-w-lg mx-auto">
    <div class="mb-5 text-center">
      <base-button :to="`/${record.secret}`">
        <base-icon-chevron-left />
        <span>Back to Dashboard</span>
      </base-button>
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
</template>

<script>
import BaseButton from '/@/components/base/BaseButton.vue'
import BaseIconChevronLeft from '/@/components/base/BaseIconChevronLeft.vue'
import ProjectForm from '/@/components/project/ProjectForm.vue'

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
  emits: ['save', 'update'],
}
</script>
