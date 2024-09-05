import pick from '#api/lib/pick'
import Project from '#api/models/project'
import projectSecretGenerator from '#api/services/projects/project_secret_generator'
import UserUpdater from '#api/services/users/user_updater'

class ProjectUpdater {
  constructor({ data, project, transaction = null }) {
    this.data = pick(data, ['name', 'time_zone'])
    this.project = project
    this.transaction = transaction

    this.userData = pick(data.user, ['email'])
    this.allowShared = data.allow_shared
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

    const data = { ...this.data }

    if (this.allowShared === true && !this.project.shared_secret) {
      data.shared_secret = projectSecretGenerator()
    } else if (this.allowShared === false) {
      data.shared_secret = null
    }

    await this.project.$query(this.transaction).patch(data)

    await this.updateUser()

    return this.project
  }
}

export default ProjectUpdater
