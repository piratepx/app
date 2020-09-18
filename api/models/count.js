const BaseModel = require('@/models/base')

class Count extends BaseModel {
  static get tableName() {
    return 'counts'
  }

  static get relationMappings() {
    const Project = require('@/models/project')

    return {
      project: {
        relation: this.BelongsToOneRelation,
        modelClass: Project,
        join: {
          from: 'counts.project_id',
          to: 'projects.id',
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
        project_id: {
          type: 'string',
          format: 'uuid',
        },
        identifier: {
          type: 'string',
          maxLength: 255,
        },
        date: {
          type: 'string',
          format: 'date',
        },
        count: {
          type: 'integer',
          default: 0,
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
      required: ['project_id', 'identifier', 'date'],
    }
  }

  async beforeSaveValidation(opt) {
    await this.validateUniqueness(['project_id', 'identifier', 'date'], opt)
  }
}

module.exports = Count
