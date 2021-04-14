
exports.up = knex => knex.schema.createTable('clients', table => {
  table.increments('id');
  table.string('fullName').notNullable();
  table.string('email').notNullable().unique();
  table.integer('age').notNullable();
  table.string('address').notNullable();
  table.string('cpf', 11).notNullable();
});

exports.down = knex => knex.schema.dropTable('clients');
