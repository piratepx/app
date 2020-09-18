<template>
  <the-layout>
    <div class="max-w-lg mx-auto">
      <project-form
        :record="record"
        :status="status"
        :time-zones="timeZones"
        :time-zones-status="timeZonesStatus"
        @update="$emit('update', $event)"
        @save="$emit('save')"
      />
    </div>
  </the-layout>
</template>

<script>
import ProjectForm from '/@/components/project/ProjectForm.vue'
import TheLayout from '/@/components/the/TheLayout.vue'

export default {
  components: {
    ProjectForm,
    TheLayout,
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
