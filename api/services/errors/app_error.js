import BaseError from '#api/services/errors/base_error'

class AppError extends BaseError {
  constructor(status, message) {
    super(message)

    this.status = status
  }
}

export default AppError
