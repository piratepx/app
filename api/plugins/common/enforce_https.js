const fp = require('fastify-plugin')

const AppError = require('@/lib/errors/app_error')

module.exports = fp(async (fastify) => {
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  fastify.addHook('onRequest', async (request, reply) => {
    if (request.protocol === 'https') {
      return
    }

    if (request.routerMethod === 'GET' || request.routerMethod === 'HEAD') {
      reply.redirect(301, `https://${request.hostname}${request.url}`)
    } else {
      throw new AppError(403, 'HTTPS required')
    }
  })
})
