const AppError = require('@/lib/errors/app_error')
const {
  Model: { ValidationError },
  NotFoundError,
} = require('objection')

module.exports = new Map([
  [
    NotFoundError,
    () => new AppError(404, 'The requested resource was not found'),
  ],
  [
    ValidationError,
    (error) => {
      const [[fieldName, [fieldError]]] = Object.entries(error.data)

      return new AppError(422, `${fieldName}: ${fieldError.message}`)
    },
  ],
])
