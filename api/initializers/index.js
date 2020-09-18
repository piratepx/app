require('dotenv').config()
require('module-alias/register')

const objection = require('@/initializers/objection')
const pg = require('@/initializers/pg')

module.exports = async () => {
  pg()
  await objection()
}
