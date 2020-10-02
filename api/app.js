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
    setHeaders(reply) {
      if (process.env.NODE_ENV !== 'production') {
        return
      }

      reply.setHeader(
        'Content-Security-Policy',
        "default-src 'none'; connect-src 'self'; img-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"
      )
      reply.setHeader(
        'Strict-Transport-Security',
        'max-age=63072000; includeSubDomains; preload'
      )
      reply.setHeader('X-Content-Type-Options', 'nosniff')
      reply.setHeader('X-Frame-Options', 'DENY')
      reply.setHeader('X-XSS-Protection', '1; mode=block')
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
