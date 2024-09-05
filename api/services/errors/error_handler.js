import errorMap from '#api/services/errors/error_map'

const errorSchema = {
  $id: 'error',
  type: 'object',
  properties: {
    error: {
      type: 'object',
      properties: {
        status: {
          type: 'integer',
        },
        message: {
          type: 'string',
        },
      },
      required: ['status', 'message'],
    },
  },
  required: ['error'],
}

async function errorHandler(error, request, reply) {
  if (errorMap.has(error.constructor)) {
    error = errorMap.get(error.constructor)(error)
  }

  reply.statusCode = error.status ?? error.statusCode ?? reply.statusCode

  if (reply.statusCode >= 500) {
    request.log.error({ err: error, res: reply }, error.message)
  } else if (reply.statusCode >= 400) {
    request.log.warn({ err: error, res: reply }, error.message)
  }

  return {
    error: {
      status: reply.statusCode,
      message: error.message,
    },
  }
}

export default errorHandler
export { errorSchema }
