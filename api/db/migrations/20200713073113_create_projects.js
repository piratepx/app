async function up(knex) {
  return await knex.schema.createTable('projects', (t) => {
    t.uuid('id')
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .notNullable()
      .primary()
    t.uuid('user_id').notNullable().references('users.id').index()
    t.string('name').notNullable()
    t.string('time_zone').notNullable()
    t.string('secret').notNullable().unique()
    t.datetime('created_at').notNullable()
    t.datetime('updated_at').notNullable()
  })
}

async function down(knex) {
  return await knex.schema.dropTable('projects')
}

export { up, down }
