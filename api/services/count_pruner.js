const { DateTime } = require('luxon')

const Count = require('@/models/count')

class CountPruner {
  constructor() {
    this.olderThan = DateTime.utc().minus({ days: 31 })
  }

  prune() {
    return Count.query().delete().where('date', '<', this.olderThan.toSQLDate())
  }
}

module.exports = CountPruner
