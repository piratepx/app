import { getTimeZones } from '@vvo/tzdb'

export default async (fastify) => {
  fastify.get(
    '/',
    {
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              time_zones: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    formatted: { type: 'string' },
                    group_names: {
                      type: 'array',
                      items: { type: 'string' },
                    },
                  },
                  required: ['name', 'formatted', 'group_names'],
                },
              },
            },
            required: ['time_zones'],
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
    async () => ({
      time_zones: getTimeZones().map((timeZone) => ({
        name: timeZone.name,
        formatted: timeZone.currentTimeFormat,
        group_names: timeZone.group,
      })),
    }),
  )
}
