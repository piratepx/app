const bearerAuth = require('fastify-bearer-auth')
const fp = require('fastify-plugin')

const bugsnag = require('@/services/bugsnag')
const Project = require('@/models/project')

module.exports = fp(async (fastify) => {
  fastify.decorateRequest('currentProject')

  fastify.register(bearerAuth, {
    async auth(secret, request) {
      const project = await Project.query()
        .withGraphFetched('user')
        .findOne({ secret })

      if (!project) {
        return false
      }

      bugsnag.setUser(project.id, project.user.email, project.name)

      request.currentProject = project

      return true
    },
  })
})
