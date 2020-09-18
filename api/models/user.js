const BaseModel = require('@/models/base')

class User extends BaseModel {
  static get tableName() {
    return 'users'
  }

  static get relationMappings() {
    const Project = require('@/models/project')

    return {
      projects: {
        relation: this.HasManyRelation,
        modelClass: Project,
        join: {
          from: 'users.id',
          to: 'projects.user_id',
        },
      },
    }
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
        },
        email: {
          type: 'string',
          format: 'email',
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
  }

  async beforeSaveValidation(opt) {
    await this.validateUniqueness('email', opt)
  }
}

module.exports = User
