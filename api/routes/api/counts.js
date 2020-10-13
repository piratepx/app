const { DateTime } = require('luxon')

const authenticateProject = require('@/plugins/authenticate_project')
const Count = require('@/models/count')
const pick = require('@/lib/pick')

module.exports = async (fastify) => {
  fastify.addSchema({
    $id: 'count',
    type: 'object',
    properties: {
      ...pick(Count.jsonSchema.properties, [
        'id',
        'identifier',
        'date',
        'count',
        'created_at',
        'updated_at',
      ]),
    },
  })

  fastify.register(authenticateProject, { allowShared: true })

  fastify.get(
    '/',
    {
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
            .toSQLDate()
        )
        .orderBy(['identifier', 'date'])

      return { counts }
    }
  )
}

module.exports.autoPrefix = '/api/counts'
