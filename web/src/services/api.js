class API {
  constructor(config = {}) {
    this.config = config
  }

  static set defaultConfig(defaultConfig) {
    this._defaultConfig = {
      ...this._defaultConfig,
      ...defaultConfig,
    }
  }

  static get defaultConfig() {
    return this._defaultConfig
  }

  set config(config) {
    this._config = {
      ...this.constructor.defaultConfig,
      ...this._config,
      ...config,
    }
  }

  get config() {
    return this._config
  }

  buildAuthorizationHeader() {
    let secret = this.config.secret

    if (!secret) {
      return null
    }

    if (this.config.isSharedSecret) {
      secret = `shared/${secret}`
    }

    return { Authorization: `Bearer ${secret}` }
  }

  async request(path, { headers, body, ...options } = {}) {
    const response = await fetch(`${this.config.url}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...this.buildAuthorizationHeader(),
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
      ...options,
    })

    return response.json()
  }
}

API.defaultConfig = {
  isSharedSecret: false,
  secret: null,
  url: import.meta.env.VITE_API_URL,
}

export default API
