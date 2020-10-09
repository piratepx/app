exports.up = (knex) =>
  knex.schema.table('projects', (t) => {
    t.string('shared_secret').unique()
  })

exports.down = (knex) =>
  knex.schema.table('projects', (t) => {
    t.dropColumn('shared_secret')
  })
