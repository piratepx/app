async function up(knex) {
  return await knex.schema.createTable('users', (t) => {
    t.uuid('id')
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .notNullable()
      .primary()
    t.string('email').notNullable().unique()
    t.datetime('created_at').notNullable()
    t.datetime('updated_at').notNullable()
  })
}

async function down(knex) {
  return await knex.schema.dropTable('users')
}

export { up, down }
