import BaseModel from '#api/models/base'
import Project from '#api/models/project'

class User extends BaseModel {
  static tableName = 'users'

  static relationMappings = () => ({
    projects: {
      relation: this.HasManyRelation,
      modelClass: Project,
      join: {
        from: 'users.id',
        to: 'projects.user_id',
      },
    },
  })

  static jsonSchema = {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      email: {
        type: 'string',
        format: 'email',
        minLength: 1,
        maxLength: 255,
      },
      created_at: {
        type: 'string',
        format: 'date-time',
      },
      updated_at: {
        type: 'string',
        format: 'date-time',
      },
    },
    required: ['email'],
  }

  async beforeSaveValidation(opt, queryContext) {
    await this.validateUniqueness('email', opt, queryContext)
  }
}

export default User
