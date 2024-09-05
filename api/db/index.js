import Knex from 'knex'
import { env } from 'node:process'

import config from '#api/db/config'

const db = Knex(config[env.NODE_ENV])

export default db
