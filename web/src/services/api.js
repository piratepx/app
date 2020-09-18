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
    const token = this.config.token

    if (!token) {
      return null
    }

    return { Authorization: `Bearer ${token}` }
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
  token: null,
  url: import.meta.env.VITE_API_URL,
}

export default API
