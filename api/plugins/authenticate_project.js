const bearerAuth = require('fastify-bearer-auth')
const fp = require('fastify-plugin')

const bugsnag = require('@/services/bugsnag')
const Project = require('@/models/project')

const SHARED_SECRET_PREFIX = 'shared/'

module.exports = fp(async (fastify, { allowShared = false }) => {
  fastify.decorateRequest('currentProject')

  fastify.register(bearerAuth, {
    async auth(secret, request) {
      const isShared = secret.startsWith(SHARED_SECRET_PREFIX)

      if (isShared && !allowShared) {
        return false
      }

      const project = await Project.query()
        .withGraphFetched('user')
        .findOne(
          isShared ? 'shared_secret' : 'secret',
          isShared ? secret.substring(SHARED_SECRET_PREFIX.length) : secret
        )

      if (!project) {
        return false
      }

      bugsnag.setUser(project.id, project.user.email, project.name)

      project.is_shared = isShared

      request.currentProject = project

      return true
    },
  })
})
