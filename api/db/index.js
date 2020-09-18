const Knex = require('knex')

const config = require('@/db/config')

module.exports = Knex(config[process.env.NODE_ENV])
