const { timeZonesNames } = require('@vvo/tzdb')

const BaseModel = require('@/models/base')

class Project extends BaseModel {
  static get tableName() {
    return 'projects'
  }

  static get relationMappings() {
    const Count = require('@/models/count')
    const User = require('@/models/user')

    return {
      counts: {
        relation: this.HasManyRelation,
        modelClass: Count,
        join: {
          from: 'projects.id',
          to: 'counts.project_id',
        },
      },
      user: {
        relation: this.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'projects.user_id',
          to: 'users.id',
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
        user_id: {
          type: 'string',
          format: 'uuid',
        },
        name: {
          type: 'string',
          maxLength: 255,
        },
        time_zone: {
          type: 'string',
          maxLength: 255,
          enum: timeZonesNames,
        },
        secret: {
          type: 'string',
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
      required: ['user_id', 'name', 'time_zone', 'secret'],
    }
  }

  async beforeSaveValidation(opt) {
    await this.validateUniqueness('secret', opt)
  }
}

module.exports = Project
