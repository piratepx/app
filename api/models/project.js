import { timeZonesNames } from '@vvo/tzdb'

import BaseModel from '#api/models/base'
import Count from '#api/models/count'
import User from '#api/models/user'

class Project extends BaseModel {
  static tableName = 'projects'

  static relationMappings = () => ({
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
  })

  static jsonSchema = {
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
        minLength: 1,
        maxLength: 255,
      },
      time_zone: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
        enum: timeZonesNames,
      },
      secret: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
      shared_secret: {
        type: ['string', 'null'],
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
    required: ['user_id', 'name', 'time_zone', 'secret'],
  }

  async beforeSaveValidation(opt, queryContext) {
    await this.validateUniqueness('secret', opt, queryContext)
    await this.validateUniqueness('shared_secret', opt, queryContext)
  }
}

export default Project
