export default async (fastify) => {
  fastify.addSchema({
    $id: 'count',
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      identifier: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
      date: {
        type: 'string',
        format: 'date',
      },
      count: {
        type: 'integer',
      },
      created_at: {
        type: 'string',
        format: 'date-time',
      },
      updated_at: {
        type: 'string',
        format: 'date-time',
      },
    },
    required: ['id', 'identifier', 'date', 'count', 'created_at', 'updated_at'],
  })
}
