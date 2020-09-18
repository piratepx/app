const BaseError = require('@/lib/errors/base_error')

class AppError extends BaseError {
  constructor(status, message) {
    super(message)

    this.status = status
  }
}

module.exports = AppError
