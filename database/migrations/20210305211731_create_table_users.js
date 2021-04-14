
exports.up = knex => knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('fullName').notNullable();
    table.string('email').notNullable().unique();
    table.integer('age').notNullable();
    table.string('address').notNullable();
    table.string('cpf', 11).notNullable();
    table.string('login').unique().notNullable();
    table.string('password').notNullable();
  });

exports.down = knex => knex.schema.dropTable('users');
