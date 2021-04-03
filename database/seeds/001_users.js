
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
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
      ]);
    });
};
