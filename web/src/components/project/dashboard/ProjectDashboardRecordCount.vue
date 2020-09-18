<template>
  <li class="flex-1" :title="countFormattedLong">
    <template v-if="record">
      <div class="h-20 mx-1 bg-gradient-to-b from-gray-900 to-gray-200">
        <div
          v-if="barHeightPercent > 0"
          class="h-5 bg-gray-100"
          :style="{ height: `${barHeightInversePercent}%` }"
        />
      </div>
      <div class="text-center text-xs border-t border-gray-200 py-1">
        {{ countFormattedShort }}
      </div>
    </template>
    <template v-if="!record">
      <div class="h-20 mx-1" />
      <div
        class="text-center text-xs text-gray-200 border-t border-gray-200 py-1"
      >
        {{ countFormattedShort }}
      </div>
    </template>
  </li>
</template>

<script>
import { formatNumberLong, formatNumberShort } from '/@/services/format_number'

export default {
  props: {
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
