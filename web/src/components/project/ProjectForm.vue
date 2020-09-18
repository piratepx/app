<template>
  <form class="space-y-5" @submit.prevent="$emit('save')">
    <base-alert v-if="isError" error>Whoops! Something went wrong.</base-alert>
    <label class="block">
      <div class="mb-1">Project Name</div>
      <base-text-input
        required
        maxlength="255"
        autofocus
        class="block w-full"
        :model-value="record.name"
        @update:model-value="$emit('update', { name: $event })"
      />
    </label>
    <label class="block">
      <div class="mb-1">Time Zone</div>
      <template v-if="!timeZones">
        <base-select
          required
          container-class="block w-full"
          model-value="loading"
        >
          <option disabled value="loading">
            <template v-if="isTimeZonesFetching">Loading...</template>
            <template v-if="isTimeZonesError"
              >Whoops! Something went wrong.</template
            >
          </option>
        </base-select>
      </template>
      <template v-if="timeZones">
        <base-select
          required
          container-class="block w-full"
          :model-value="recordTimeZoneName"
          @update:model-value="$emit('update', { time_zone: $event })"
        >
          <option disabled value>Select one...</option>
          <option
            v-for="timeZone in timeZones"
            :key="timeZone.name"
            :value="timeZone.name"
          >
            {{ timeZone.formatted }}
          </option>
        </base-select>
      </template>
    </label>
    <label class="block">
      <div class="mb-1">Email</div>
      <base-text-input
        type="email"
        required
        maxlength="255"
        class="block w-full"
        :model-value="record.user.email"
        @update:model-value="$emit('update', { user: { email: $event } })"
      />
    </label>
    <base-button type="submit" primary :disabled="isSaveDisabled"
      >Save</base-button
    >
  </form>
</template>

<script>
import BaseAlert from '/@/components/base/BaseAlert.vue'
import BaseButton from '/@/components/base/BaseButton.vue'
import BaseSelect from '/@/components/base/BaseSelect.vue'
import BaseTextInput from '/@/components/base/BaseTextInput.vue'
import { STATUS_ERROR, STATUS_SAVING } from '/@/store/modules/projects/current'
import {
  STATUS_ERROR as TIME_ZONES_STATUS_ERROR,
  STATUS_FETCHING as TIME_ZONES_STATUS_FETCHING,
} from '/@/store/modules/time_zones'

export default {
  components: {
    BaseAlert,
    BaseButton,
    BaseSelect,
    BaseTextInput,
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
  computed: {
    isSaveDisabled() {
      return this.isSaving || !this.timeZones
    },
    isError() {
      return this.status === STATUS_ERROR
    },
    isSaving() {
      return this.status === STATUS_SAVING
    },
    isTimeZonesError() {
      return this.timeZonesStatus === TIME_ZONES_STATUS_ERROR
    },
    isTimeZonesFetching() {
      return this.timeZonesStatus === TIME_ZONES_STATUS_FETCHING
    },
    recordTimeZone() {
      if (!this.timeZones || !this.record.time_zone) {
        return null
      }

      return this.timeZones.find((timeZone) =>
        timeZone.group_names.includes(this.record.time_zone)
      )
    },
    recordTimeZoneName() {
      return this.recordTimeZone && this.recordTimeZone.name
    },
  },
}
</script>
