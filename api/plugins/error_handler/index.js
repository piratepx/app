const bugsnag = require('@/services/bugsnag')
const map = require('@/plugins/error_handler/map')

module.exports = async (error, request, reply) => {
  if (map.has(error.constructor)) {
    error = map.get(error.constructor)(error)

    reply.statusCode = error.status
  }

  if (reply.statusCode >= 500) {
    bugsnag.notify(error)
    reply.log.error({ req: request, res: reply, err: error }, error.message)
  } else if (reply.statusCode >= 400) {
    reply.log.info({ res: reply, err: error }, error.message)
  }

  return {
    error: {
      message: error.message,
      status: error.status || reply.statusCode,
    },
  }
}
