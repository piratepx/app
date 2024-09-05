import Project from '#api/models/project'
import AppError from '#api/services/errors/app_error'

const SHARED_SECRET_PREFIX = 'shared/'

async function auth(fastify) {
  fastify.decorateRequest('currentProject')

  await fastify.register(import('@fastify/bearer-auth'), {
    async auth(secret, request) {
      const isShared = secret.startsWith(SHARED_SECRET_PREFIX)

      const project = await Project.query()
        .withGraphFetched('user')
        .findOne(
          isShared ? 'shared_secret' : 'secret',
          isShared ? secret.substring(SHARED_SECRET_PREFIX.length) : secret,
        )

      if (!project) {
        return false
      }

      project.is_shared = isShared

      request.currentProject = project

      return true
    },
    addHook: false,
    // Disable error logging, as it's already done by our error handler.
    verifyErrorLogLevel: null,
  })

  fastify.decorate('auth', ({ allowShared = false } = {}) => [
    fastify.verifyBearerAuth,
    async (request) => {
      if (request.currentProject.is_shared && !allowShared) {
        throw new AppError(403, 'Shared secret does not have permission')
      }
    },
  ])
}

export default auth
