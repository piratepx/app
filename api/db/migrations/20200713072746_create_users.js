exports.up = (knex) =>
  knex.schema.createTable('users', (t) => {
    t.uuid('id')
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .notNullable()
      .primary()
    t.string('email').notNullable().unique()
    t.datetime('created_at').notNullable()
    t.datetime('updated_at').notNullable()
  })

exports.down = (knex) => knex.schema.dropTable('users')
