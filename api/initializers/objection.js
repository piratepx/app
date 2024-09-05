import { Model } from 'objection'

import db from '#api/db/index'

async function initializeObjection() {
  Model.knex(db)

  await db.raw("SELECT 'Hello?'")
}

export default initializeObjection
