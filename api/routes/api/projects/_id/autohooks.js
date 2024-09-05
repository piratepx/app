import Project from '#api/models/project'
import AppError from '#api/services/errors/app_error'

export default async (fastify) => {
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
}
