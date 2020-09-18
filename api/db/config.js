const defaults = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
}

module.exports = {
  development: {
    ...defaults,
    debug: true,
  },
  production: {
    ...defaults,
  },
}
