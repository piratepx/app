import { DateTime } from 'luxon'

import Count from '#api/models/count'

class CountPruner {
  constructor() {
    this.olderThan = DateTime.utc().minus({ days: 31 })
  }

  prune() {
    return Count.query().delete().where('date', '<', this.olderThan.toSQLDate())
  }
}

export default CountPruner
