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
    brotliOptions: {
      params: {
        [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
        [zlib.constants.BROTLI_PARAM_QUALITY]: 1,
      },
    },
    zlibOptions: {
      level: zlib.constants.Z_BEST_SPEED,
    },
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
