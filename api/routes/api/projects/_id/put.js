import { timeZonesNames } from '@vvo/tzdb'

import ProjectUpdater from '#api/services/projects/project_updater'

export default async (fastify) => {
  fastify.put(
    '',
    {
      preValidation: fastify.auth(),
      schema: {
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
          },
        },
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
                allow_shared: { type: 'boolean' },
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
                },
              },
            },
          },
          required: ['project'],
        },
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
    async (request) => {
      const updater = new ProjectUpdater({
        data: request.body.project,
        project: request.project,
      })

      await updater.update()

      return { project: request.project }
    },
  )
}
