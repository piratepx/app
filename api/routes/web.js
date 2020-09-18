module.exports = async (fastify) => {
  fastify.get('/*', (request, reply) => {
    reply.sendFile('index.html')
  })
}
