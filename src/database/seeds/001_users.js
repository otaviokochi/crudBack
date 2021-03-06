
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
          password: '6d98056ad5a5d243b7b082e008fe9281'
        },
      ]);
    });
};
