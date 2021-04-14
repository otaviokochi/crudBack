const knex = require('./database/db');

module.exports = async () => {
  await knex.schema.dropTable('users').dropTable('clients');
  await knex.destroy();
}