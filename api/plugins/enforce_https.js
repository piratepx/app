import { env } from 'node:process'

import AppError from '#api/services/errors/app_error'

async function enforceHTTPS(fastify) {
  if (env.NODE_ENV !== 'production') {
    return
  }

  fastify.addHook('onRequest', async (request, reply) => {
    if (request.raw.socket.encrypted) {
      return
    }

    if (request.headers['x-forwarded-proto']?.substring(0, 5) === 'https') {
      return
    }

    if (request.routerMethod === 'GET' || request.routerMethod === 'HEAD') {
      reply.redirect(301, `https://${request.hostname}${request.url}`)
    } else {
      throw new AppError(403, 'HTTPS required')
    }
  })
}

export default enforceHTTPS
