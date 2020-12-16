const path = require('path')

module.exports = async (fastify) => {
  fastify.register(require('fastify-static'), {
    root: path.join(__dirname, '../../web/dist'),
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
      reply.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
    },
  })

  fastify.get('/*', (request, reply) => {
    reply.sendFile('index.html')
  })
}
