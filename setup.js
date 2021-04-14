const knex = require('./database/db');


module.exports = async () => {
  await knex.schema.createTable('clients', table => {
    table.increments('id');
    table.string('fullName').notNullable();
    table.string('email').notNullable().unique();
    table.integer('age').notNullable();
    table.string('address').notNullable();
    table.string('cpf', 11).notNullable();
  }).createTable('users', table => {
    table.increments('id');
    table.string('fullName').notNullable();
    table.string('email').notNullable().unique();
    table.integer('age').notNullable();
    table.string('address').notNullable();
    table.string('cpf', 11).notNullable();
    table.string('login').unique().notNullable();
    table.string('password').notNullable();
  });

  await knex('users').del()
  .then(function () {
    return knex('users').insert([
      {
        id: 1,
        fullName: 'otavio',
        email: 'otavio@kochi',
        age: 44,
        address: 'osvaldo cruz',
        cpf: '0000',
        login: 'otaviokochi',
        password: '$2b$10$wM57obIBLX9hMSWRcwOPPei0WpMfD/yA3L.e9.ZZSnpM8CP9FRUEO'
      },
      {
        id: 2,
        fullName: 'otavio',
        email: 'teste@kochi',
        age: 44,
        address: 'osvaldo cruz',
        cpf: '0000',
        login: 'testekochi',
        password: '$2b$10$wM57obIBLX9hMSWRcwOPPei0WpMfD/yA3L.e9.ZZSnpM8CP9FRUEO'
      },
    ]);
  });
}