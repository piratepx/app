async function up(knex) {
  return await knex.schema.table('projects', (t) => {
    t.string('shared_secret').unique()
  })
}

async function down(knex) {
  return await knex.schema.table('projects', (t) => {
    t.dropColumn('shared_secret')
  })
}

export { up, down }
