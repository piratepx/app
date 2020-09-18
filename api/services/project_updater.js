const pick = require('@/lib/pick')
const Project = require('@/models/project')
const UserUpdater = require('@/services/user_updater')

class ProjectUpdater {
  constructor({ data, project, transaction = null }) {
    this.data = pick(data, ['name', 'time_zone'])
    this.project = project
    this.transaction = transaction
    this.userData = pick(data.user, ['email'])
  }

  updateUser() {
    if (!this.project.user || !this.userData) {
      return false
    }

    const updater = new UserUpdater({
      data: this.userData,
      transaction: this.transaction,
      user: this.project.user,
    })

    return updater.update()
  }

  updateWithTransaction() {
    return Project.transaction(async (transaction) => {
      this.transaction = transaction

      const update = await this.update()

      this.transaction = null

      return update
    })
  }

  async update() {
    if (!this.transaction) {
      return this.updateWithTransaction()
    }

    await this.project.$query(this.transaction).patch({
      ...this.data,
    })

    await this.updateUser()

    return this.project
  }
}

module.exports = ProjectUpdater
