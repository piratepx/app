const AppError = require('@/lib/errors/app_error')
const authenticateProject = require('@/plugins/authenticate_project')
const pick = require('@/lib/pick')
const Project = require('@/models/project')
const ProjectCreator = require('@/services/project_creator')
const ProjectUpdater = require('@/services/project_updater')
const User = require('@/models/user')

module.exports = async (fastify) => {
  fastify.addSchema({
    $id: 'project',
    type: 'object',
    properties: {
      project: {
        type: 'object',
        if: {
          properties: {
            is_shared: { const: true },
          },
          required: ['is_shared'],
        },
        then: {
          properties: {
            ...pick(Project.jsonSchema.properties, [
              'id',
              'name',
              'time_zone',
              'created_at',
              'updated_at',
            ]),
            is_shared: { type: 'boolean' },
          },
        },
        else: {
          properties: {
            ...pick(Project.jsonSchema.properties, [
              'id',
              'name',
              'time_zone',
              'secret',
              'shared_secret',
              'created_at',
              'updated_at',
            ]),
            user: {
              type: 'object',
              properties: {
                ...pick(User.jsonSchema.properties, ['email']),
              },
            },
          },
        },
      },
    },
  })

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
                ...pick(Project.jsonSchema.properties, ['name', 'time_zone']),
                user: {
                  type: 'object',
                  properties: {
                    ...pick(User.jsonSchema.properties, ['email']),
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
        },
      },
    },
    async (request, reply) => {
      const creator = new ProjectCreator({
        data: request.body.project,
      })

      const project = await creator.create()

      reply.code(201)

      return { project }
    }
  )

  fastify.register(async (fastify) => {
    fastify.register(authenticateProject)

    fastify.decorateRequest('project')

    fastify.addHook('preHandler', async (request) => {
      const id = request.params.id

      if (id !== request.currentProject.id) {
        throw new AppError(403, 'Only the authorized project can be updated')
      }

      request.project = await Project.query()
        .withGraphFetched('user')
        .findOne({ id })
        .throwIfNotFound()
    })

    fastify.put(
      '/:id',
      {
        schema: {
          params: {
            ...pick(Project.jsonSchema.properties, ['id']),
          },
          body: {
            type: 'object',
            properties: {
              project: {
                type: 'object',
                properties: {
                  ...pick(Project.jsonSchema.properties, ['name', 'time_zone']),
                  allow_shared: { type: 'boolean' },
                  user: {
                    type: 'object',
                    properties: {
                      ...pick(User.jsonSchema.properties, ['email']),
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
      }
    )
  })

  fastify.register(async (fastify) => {
    fastify.register(authenticateProject, { allowShared: true })

    fastify.get(
      '/current',
      {
        schema: {
          response: {
            200: {
              $ref: 'project',
            },
          },
        },
      },
      (request) => ({ project: request.currentProject })
    )
  })
}

module.exports.autoPrefix = '/api/projects'
