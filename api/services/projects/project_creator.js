import pick from '#api/lib/pick'
import Project from '#api/models/project'
import projectSecretGenerator from '#api/services/projects/project_secret_generator'
import UserCreator from '#api/services/users/user_creator'

class ProjectCreator {
  constructor({ data, transaction = null }) {
    this.data = pick(data, ['name', 'time_zone'])
    this.transaction = transaction

    this.userData = pick(data.user, ['email'])
  }

  createUser() {
    const creator = new UserCreator({
      data: this.userData,
      transaction: this.transaction,
    })

    return creator.create()
  }

  createWithTransaction() {
    return Project.transaction(async (transaction) => {
      this.transaction = transaction

      const create = await this.create()

      this.transaction = null

      return create
    })
  }

  async create() {
    if (!this.transaction) {
      return this.createWithTransaction()
    }

    const user = await this.createUser()

    const project = await Project.query(this.transaction)
      .insert({
        ...this.data,
        user_id: user.id,
        secret: projectSecretGenerator(),
      })
      .returning('*')

    project.$setRelated('user', user)

    return project
  }
}

export default ProjectCreator
