async function up(knex) {
  return await knex.schema.createTable('counts', (t) => {
    t.uuid('id')
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .notNullable()
      .primary()
    t.uuid('project_id').notNullable().references('projects.id')
    t.string('identifier').notNullable()
    t.date('date').notNullable().index()
    t.integer('count').notNullable().defaultTo(0)
    t.datetime('created_at').notNullable()
    t.datetime('updated_at').notNullable()

    t.unique(['project_id', 'identifier', 'date'])
  })
}

async function down(knex) {
  return await knex.schema.dropTable('counts')
}

export { up, down }
