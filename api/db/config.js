import { env } from 'node:process'

const defaults = {
  client: 'pg',
  connection: env.DATABASE_URL,
  pool: {
    min: 0,
    max: 10,
  },
}

const config = {
  development: {
    ...defaults,
    debug: true,
  },
  production: {
    ...defaults,
  },
}

export default config
