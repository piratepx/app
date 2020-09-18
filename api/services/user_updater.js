const pick = require('@/lib/pick')
const User = require('@/models/user')

class UserUpdater {
  constructor({ data, transaction = null, user }) {
    this.data = pick(data, ['email'])
    this.transaction = transaction
    this.user = user
  }

  updateWithTransaction() {
    return User.transaction(async (transaction) => {
      this.transaction = transaction

      const update = await this.update()

      this.transaction = null

      return update
    })
  }

  async update() {
    if (!this.transaction) {
      return this.updateWithTransaction()
    }

    await this.user.$query(this.transaction).patch({
      ...this.data,
    })

    return this.user
  }
}

module.exports = UserUpdater
