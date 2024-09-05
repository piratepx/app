import BaseModel from '#api/models/base'
import Project from '#api/models/project'

class Count extends BaseModel {
  static tableName = 'counts'

  static relationMappings = () => ({
    project: {
      relation: this.BelongsToOneRelation,
      modelClass: Project,
      join: {
        from: 'counts.project_id',
        to: 'projects.id',
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
      project_id: {
        type: 'string',
        format: 'uuid',
      },
      identifier: {
        type: 'string',
        minLength: 1,
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

  async beforeSaveValidation(opt, queryContext) {
    await this.validateUniqueness(
      ['project_id', 'identifier', 'date'],
      opt,
      queryContext,
    )
  }
}

export default Count
