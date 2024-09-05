import 'dotenv/config'

import initializeObjection from '#api/initializers/objection'
import initializePG from '#api/initializers/pg'

async function initializers() {
  initializePG()
  await initializeObjection()
}

export default initializers
