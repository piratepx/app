const { types } = require('pg')

module.exports = () => {
  // Parse date type as string instead of Date to prevent time zone conversion.
  // See: https://github.com/brianc/node-postgres/issues/1844
  types.setTypeParser(1082, (date) => date)
}
