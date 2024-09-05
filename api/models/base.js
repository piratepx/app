import { Model } from 'objection'

class BaseModel extends Model {
  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext)

    const date = new Date().toISOString()

    this.created_at = date
    this.updated_at = date

    await this.beforeSaveValidation(null, queryContext)
  }

  async $beforeUpdate(opt, queryContext) {
    await super.$beforeUpdate(opt, queryContext)

    this.updated_at = new Date().toISOString()

    await this.beforeSaveValidation(opt, queryContext)
  }

  // eslint-disable-next-line no-unused-vars
  async beforeSaveValidation(opt, queryContext) {}

  values(fieldOrFields) {
    const fields = Array.isArray(fieldOrFields)
      ? fieldOrFields
      : [fieldOrFields]

    return fields.reduce(
      (accumulator, field) => ({
        ...accumulator,
        [field]: this[field],
      }),
      {},
    )
  }

  static async isUnique(where, transaction = null) {
    const model = await this.query(transaction).findOne(where)

    return !model
  }

  async validateUniqueness(fieldOrFields, opt, queryContext) {
    const values = this.values(fieldOrFields)
    const fields = Object.keys(values)

    const everyValueEmpty = Object.values(values).every(
      (value) => value === undefined || value === null,
    )

    if (everyValueEmpty) {
      return true
    }

    const id = opt?.old?.id

    const isUnique = await this.constructor.isUnique((builder) => {
      builder.where(values)

      if (id) {
        builder.whereNot('id', id)
      }
    }, queryContext.transaction)

    if (!isUnique) {
      throw this.buildValidationError(fields.join(' + '), 'already exists')
    }

    return true
  }

  buildValidationError(field, message) {
    return new this.constructor.ValidationError({
      type: 'ModelValidation',
      data: {
        [field]: [{ message }],
      },
    })
  }

  static async findOneOrInsert(
    findOneWhere,
    insertModelOrObject = null,
    transaction = null,
  ) {
    let model = await this.query(transaction).findOne(findOneWhere)

    if (model) {
      return model
    }

    try {
      model = await this.query(transaction)
        .insert(insertModelOrObject || findOneWhere)
        .returning('*')
    } catch (error) {
      model = await this.query(transaction).findOne(findOneWhere)

      if (!model) {
        throw error
      }
    }

    return model
  }
}

export default BaseModel
