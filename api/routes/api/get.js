export default async (fastify) => {
  fastify.get('/', { logLevel: 'silent' }, async () => {
    return
  })
}
