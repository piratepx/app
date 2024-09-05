import { Model, NotFoundError } from 'objection'

import AppError from '#api/services/errors/app_error'

const errorMap = new Map([
  [
    NotFoundError,
    () => new AppError(404, 'The requested resource was not found'),
  ],
  [
    Model.ValidationError,
    (error) => {
      const [[fieldName, [fieldError]]] = Object.entries(error.data)

      return new AppError(422, `${fieldName}: ${fieldError.message}`)
    },
  ],
])

export default errorMap
