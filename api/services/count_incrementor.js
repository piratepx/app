const { DateTime } = require('luxon')

const Count = require('@/models/count')

class CountIncrementor {
  constructor({ data, project }) {
    this.data = data
    this.project = project

    this.date = DateTime.local().setZone(this.project.time_zone)
  }

  create() {
    return Count.query()
      .insert({
        project_id: this.project.id,
        identifier: this.data.identifier,
        date: this.date.toSQLDate(),
        count: 1,
      })
      .returning('*')
  }

  update() {
    return Count.query()
      .increment('count', 1)
      .where({
        project_id: this.project.id,
        identifier: this.data.identifier,
        date: this.date.toSQLDate(),
      })
      .returning('*')
      .first()
  }

  async increment() {
    let count = await this.update()

    if (count) {
      return count
    }

    count = await this.create()

    return count
  }
}

module.exports = CountIncrementor
