// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: "localhost",
      user: "root", 
      password: "otaviokochi",
      database: "crud"
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  },
};
