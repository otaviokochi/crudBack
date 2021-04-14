const database = process.env.NODE_ENV == 'test' ? 'crudTest' : 'crud';

// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: "localhost",
      user: "root", 
      password: "otaviokochi",
      database: database
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/database/seeds`
    }
  },
};
