class CountRequestData {
  constructor({ request }) {
    this.request = request

    this._identifier = undefined
  }

  get projectID() {
    return this.request.query.p
  }

  get identifier() {
    if (this._identifier !== undefined) {
      return this._identifier
    }

    if (this.request.query.i !== undefined) {
      return this.request.query.i
    }

    if (this.request.headers.referer === undefined) {
      return null
    }

    let url

    try {
      url = new URL(this.request.headers.referer)

      this._identifier = url.pathname
    } catch {
      this._identifier = null
    }

    return this._identifier
  }
}

export default CountRequestData
