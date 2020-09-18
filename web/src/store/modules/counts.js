import API from '/@/services/api'
import toISODateString from '/@/lib/to_iso_date_string'

const initialState = () => ({
  status: null,
  records: null,
  error: null,
})

export const STATUS_FETCHING = 'FETCHING'
export const STATUS_SUCCESS = 'SUCCESS'
export const STATUS_ERROR = 'ERROR'

export default {
  namespaced: true,
  state: initialState(),
  getters: {
    recordsGrouped(state) {
      if (!state.records) {
        return null
      }

      return state.records.reduce((map, record) => {
        if (map.has(record.identifier)) {
          map.get(record.identifier).set(record.date, record)
        } else {
          map.set(record.identifier, new Map([[record.date, record]]))
        }

        return map
      }, new Map())
    },
    recordsGroupedAndSorted(state, getters, rootState) {
      if (!state.records) {
        return null
      }

      const today = toISODateString({
        date: new Date(),
        timeZone: rootState.projects.current.record.time_zone,
      })
      const recordsGrouped = Array.from(getters.recordsGrouped.entries())

      return new Map(
        recordsGrouped.sort(([, a], [, b]) => {
          const aCount = a.has(today) ? a.get(today).count : 0
          const bCount = b.has(today) ? b.get(today).count : 0

          return bCount - aCount
        })
      )
    },
    maxCount(state) {
      if (!state.records) {
        return null
      }

      return state.records.reduce(
        (maxCount, record) =>
          record.count > maxCount ? record.count : maxCount,
        0
      )
    },
  },
  mutations: {
    set(state, { records }) {
      state.records = records
      state.status = STATUS_SUCCESS
      state.error = null
    },
    setError(state, { error }) {
      state.error = error
      state.status = STATUS_ERROR
    },
    setStatus(state, { status }) {
      state.status = status
    },
    reset(state) {
      Object.assign(state, initialState())
    },
  },
  actions: {
    async fetch({ commit, state }) {
      if (state.status === STATUS_FETCHING) {
        return false
      }

      commit('setStatus', { status: STATUS_FETCHING })

      const { counts: records, error } = await new API().request('/counts')

      if (error) {
        commit('setError', { error })
      } else {
        commit('set', { records })
      }

      return records
    },
  },
}
