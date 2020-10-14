<template>
  <li class="flex-1" :title="countFormattedLong">
    <div
      v-if="record"
      class="h-20 mx-1 bg-gradient-to-b from-gray-900 to-gray-200"
    >
      <div
        v-if="barHeightPercent > 0"
        class="h-5 bg-gray-100"
        :style="{ height: `${barHeightInversePercent}%` }"
      />
    </div>
    <div v-if="!record" class="h-20 mx-1" />
    <div
      class="text-center text-xs border-t border-gray-200 py-1"
      :class="{
        'font-semibold': isToday,
        'text-gray-200': !isToday && !record,
      }"
    >
      {{ countFormattedShort }}
    </div>
  </li>
</template>

<script>
import { formatNumberLong, formatNumberShort } from '/@/services/format_number'

export default {
  props: {
    isToday: {
      type: Boolean,
      default: false,
    },
    maxCount: {
      type: Number,
      default: 100,
    },
    record: {
      type: Object,
      default: null,
    },
  },
  computed: {
    count() {
      return this.record ? this.record.count : 0
    },
    countFormattedLong() {
      return formatNumberLong(this.count)
    },
    countFormattedShort() {
      return formatNumberShort(this.count)
    },
    maxCountBounded() {
      return Math.max(100, this.maxCount)
    },
    barHeightPercent() {
      return Math.max(1, (this.count / this.maxCountBounded) * 100)
    },
    barHeightInversePercent() {
      return 100 - this.barHeightPercent
    },
  },
}
</script>
