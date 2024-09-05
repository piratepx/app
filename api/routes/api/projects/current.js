export default async (fastify) => {
  fastify.get(
    '/current',
    {
      preValidation: fastify.auth({ allowShared: true }),
      schema: {
        response: {
          200: {
            $ref: 'project',
          },
          '4xx': {
            $ref: 'error',
          },
          '5xx': {
            $ref: 'error',
          },
        },
      },
    },
    async (request) => ({ project: request.currentProject }),
  )
}
