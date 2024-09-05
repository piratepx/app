import px from '#api/lib/px'
import Project from '#api/models/project'
import CountIncrementor from '#api/services/counts/count_incrementor'
import CountRequestData from '#api/services/counts/count_request_data'
import AppError from '#api/services/errors/app_error'

export default async (fastify) => {
  await fastify.register(import('@fastify/cors'))

  fastify.get(
    '/',
    {
      attachValidation: true,
      schema: {
        querystring: {
          type: 'object',
          properties: {
            p: {
              type: 'string',
              format: 'uuid',
            },
            i: {
              type: 'string',
              minLength: 1,
              maxLength: 255,
            },
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
      await reply
        .type('image/gif')
        .headers({
          'Cache-Control': 'private, max-age=0, no-cache, no-store',
          Expires: '-1',
          Pragma: 'no-cache',
        })
        .send(px)

      try {
        if (request.validationError) {
          throw request.validationError
        }

        const data = new CountRequestData({ request })

        const project = await Project.query().findById(data.projectID)

        if (!project) {
          throw new AppError(404, 'Project not found')
        }

        const incrementor = new CountIncrementor({ data, project })

        await incrementor.increment()
      } catch (error) {
        const statusCode = error.status ?? error.statusCode ?? 500

        if (statusCode >= 500) {
          request.log.error(error)
        } else if (statusCode >= 400) {
          request.log.warn(error)
        }
      }
    },
  )
}
