import { timeZonesNames } from '@vvo/tzdb'

import ProjectCreator from '#api/services/projects/project_creator'

export default async (fastify) => {
  fastify.post(
    '/',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            project: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  minLength: 1,
                  maxLength: 255,
                },
                time_zone: {
                  type: 'string',
                  minLength: 1,
                  maxLength: 255,
                  enum: timeZonesNames,
                },
                user: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string',
                      format: 'email',
                      minLength: 1,
                      maxLength: 255,
                    },
                  },
                  required: ['email'],
                },
              },
              required: ['name', 'time_zone', 'user'],
            },
          },
          required: ['project'],
        },
        response: {
          201: {
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
    async (request, reply) => {
      const creator = new ProjectCreator({
        data: request.body.project,
      })

      const project = await creator.create()

      reply.statusCode = 201

      return { project }
    },
  )
}
