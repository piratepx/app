async function up(knex) {
  return await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
}

async function down(knex) {
  return await knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"')
}

export { up, down }
