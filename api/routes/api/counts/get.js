import { DateTime } from 'luxon'

import Count from '#api/models/count'

export default async (fastify) => {
  fastify.get(
    '/',
    {
      preValidation: fastify.auth({ allowShared: true }),
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              counts: {
                type: 'array',
                items: {
                  $ref: 'count',
                },
              },
            },
            required: ['counts'],
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
      const counts = await Count.query()
        .where({ project_id: request.currentProject.id })
        .where(
          'date',
          '>',
          DateTime.local()
            .setZone(request.currentProject.time_zone)
            .minus({ days: 30 })
            .toSQLDate(),
        )
        .orderBy(['identifier', 'date'])

      return { counts }
    },
  )
}
