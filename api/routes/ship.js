const Count = require('@/models/count')
const CountIncrementor = require('@/services/count_incrementor')
const CountRequestData = require('@/services/count_request_data')
const Project = require('@/models/project')
const px = require('@/lib/px')

module.exports = async (fastify) => {
  fastify.get(
    '/ship',
    {
      attachValidation: true,
      errorHandler(error, request) {
        request.log.warn(error)
      },
      schema: {
        querystring: {
          type: 'object',
          properties: {
            p: Project.jsonSchema.properties.id,
            i: Count.jsonSchema.properties.identifier,
          },
          required: ['p'],
        },
        response: {
          200: {
            type: 'string',
            contentEncoding: 'binary',
            contentMediaType: 'image/gif',
          },
        },
      },
    },
    async (request, reply) => {
      reply
        .type('image/gif')
        .headers({
          'Cache-Control': 'private, max-age=0, no-cache, no-store',
          Expires: '-1',
          Pragma: 'no-cache',
        })
        .send(px)

      if (request.validationError) {
        throw request.validationError
      }

      const data = new CountRequestData({ request })

      const project = await Project.query().findById(data.projectID)

      if (!project) {
        throw new Error('Project not found')
      }

      const incrementor = new CountIncrementor({ data, project })

      await incrementor.increment()
    }
  )
}
