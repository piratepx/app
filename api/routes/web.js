import { join } from 'node:path'
import { env } from 'node:process'

import { webDir } from '#api/lib/paths'

export default async (fastify) => {
  if (env.NODE_ENV !== 'production') {
    return
  }

  await fastify.register(import('@fastify/static'), {
    root: join(webDir, 'dist'),
    wildcard: false,
    setHeaders(reply) {
      reply.setHeader(
        'Content-Security-Policy',
        "default-src 'none'; connect-src 'self'; img-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
      )
      reply.setHeader(
        'Strict-Transport-Security',
        'max-age=63072000; includeSubDomains; preload',
      )
      reply.setHeader('X-Content-Type-Options', 'nosniff')
      reply.setHeader('X-Frame-Options', 'DENY')
      reply.setHeader('X-XSS-Protection', '1; mode=block')
      reply.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
    },
  })

  fastify.get('/*', (request, reply) => {
    reply.sendFile('index.html')
  })
}
