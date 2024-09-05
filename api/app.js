import { join } from 'node:path'

import autoLoad from '@fastify/autoload'

import initializers from '#api/initializers/index'

import { apiDir } from '#api/lib/paths'
import cronJobScheduler from '#api/services/cron_job_scheduler'
import errorHandler, { errorSchema } from '#api/services/errors/error_handler'

// eslint-disable-next-line no-unused-vars
async function app(fastify, options) {
  await initializers()

  fastify.addSchema(errorSchema)
  fastify.setErrorHandler(errorHandler)

  await fastify.register(autoLoad, {
    dir: join(apiDir, 'plugins'),
    encapsulate: false,
  })

  fastify.register(autoLoad, {
    dir: join(apiDir, 'routes'),
    autoHooks: true,
    cascadeHooks: true,
    routeParams: true,
  })

  cronJobScheduler()
}

export default app
