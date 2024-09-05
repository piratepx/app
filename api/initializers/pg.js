import pg from 'pg'

function initializePG() {
  // Parse date type as string instead of Date to prevent time zone conversion.
  // See: https://github.com/brianc/node-postgres/issues/1844
  pg.types.setTypeParser(1082, (date) => date)
}

export default initializePG
