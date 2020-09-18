const { Model } = require('objection')

const db = require('@/db')

module.exports = () => {
  Model.knex(db)

  return db.raw("SELECT 'Hello?'")
}
