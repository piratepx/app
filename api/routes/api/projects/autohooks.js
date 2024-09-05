import { timeZonesNames } from '@vvo/tzdb'

export default async (fastify) => {
  fastify.addSchema({
    $id: 'project',
    type: 'object',
    properties: {
      project: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
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
          created_at: {
            type: 'string',
            format: 'date-time',
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
          },
          is_shared: { type: 'boolean' },
        },
        required: ['id', 'name', 'time_zone', 'created_at', 'updated_at'],
        if: {
          type: 'object',
          properties: {
            is_shared: { const: false },
          },
        },
        then: {
          type: 'object',
          properties: {
            secret: {
              type: 'string',
              minLength: 1,
              maxLength: 255,
            },
            shared_secret: {
              type: ['string', 'null'],
              minLength: 1,
              maxLength: 255,
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
          required: ['secret', 'shared_secret', 'user'],
        },
      },
    },
  })
}
