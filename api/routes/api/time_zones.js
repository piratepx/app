const { getTimeZones } = require('@vvo/tzdb')

module.exports = async (fastify) => {
  fastify.get(
    '/time_zones',
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
                },
              },
            },
          },
        },
      },
    },
    () => ({
      time_zones: getTimeZones().map((timeZone) => ({
        name: timeZone.name,
        formatted: timeZone.currentTimeFormat,
        group_names: timeZone.group,
      })),
    })
  )
}
