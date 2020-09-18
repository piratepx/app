const { Model } = require('objection')

class BaseModel extends Model {
  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext)

    const date = new Date().toISOString()

    this.created_at = date
    this.updated_at = date

    await this.beforeSaveValidation(null)
  }

  async $beforeUpdate(opt, queryContext) {
    await super.$beforeUpdate(opt, queryContext)

    this.updated_at = new Date().toISOString()

    await this.beforeSaveValidation(opt)
  }

  async beforeSaveValidation(/* opt */) {}

  values(fieldOrFields) {
    const fields = Array.isArray(fieldOrFields)
      ? fieldOrFields
      : [fieldOrFields]

    return fields.reduce(
      (accumulator, field) => ({
        ...accumulator,
        [field]: this[field],
      }),
      {}
    )
  }

  static async isUnique(...whereArgs) {
    const model = await this.query().findOne(...whereArgs)

    return !model
  }

  async validateUniqueness(fieldOrFields, opt = null) {
    const values = this.values(fieldOrFields)
    const fields = Object.keys(values)

    const everyUndefined = Object.values(values).every(
      (value) => value === undefined
    )

    if (everyUndefined) {
      return true
    }

    const id = opt && opt.old && opt.old.id

    const isUnique = await this.constructor.isUnique((builder) => {
      builder.where(values)

      if (id) {
        builder.whereNot('id', id)
      }
    })

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
    transaction = null
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

module.exports = BaseModel
