// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: "",
      user: "", 
      password: "",
      database: ""
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
