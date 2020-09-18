const path = require('path')
const zlib = require('zlib')

const AutoLoad = require('fastify-autoload')

const initializers = require('./initializers')

require('@/services/bugsnag')

const errorHandler = require('@/plugins/error_handler')
const scheduleCronJobs = require('@/services/schedule_cron_jobs')

module.exports = async (fastify, opts) => {
  await initializers()

  fastify.register(require('fastify-compress'), {
    zlibOptions: {
      level: zlib.constants.Z_DEFAULT_COMPRESSION,
    },
  })

  fastify.register(require('fastify-static'), {
    root: path.join(__dirname, '../web/dist'),
    wildcard: false,
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins', 'common'),
    options: { ...opts },
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: { ...opts },
  })

  fastify.setErrorHandler(errorHandler)

  scheduleCronJobs()
}
