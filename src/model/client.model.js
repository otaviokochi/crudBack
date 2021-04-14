const knex = require('../../database/db')

const Client = function (client) {
  this.address = client.address;
  this.cpf = client.cpf;
  this.fullName = client.name;
  this.email = client.email;
  this.age = client.age
};

Client.create = (newClient, result) => {
  knex('clients').insert({
    address: newClient.address,
    cpf: newClient.cpf,
    fullName: newClient.fullName,
    email: newClient.email,
    age: newClient.age,
  })
    .then(response => result(null, response))
    .catch(err => result(err, null));
};

Client.getAll = result => {
  knex('clients')
    .then(response => result(null, response))
    .catch(err => result(err, null));
};

Client.getByName = (clientName, result) => {
  knex('clients').where('fullName', 'like', `%${clientName}%`)
    .then(response => {
      result(null, response)
    })
    .catch(err => result(err, null));
};

Client.findById = (id, result) => {
  knex('clients').where('id', id)
    .first()
    .then(response => result(null, response))
    .catch(err => result(err, null));
};

Client.updateById = (id, client, result) => {
  knex('clients').where('id', id).update({
    address: client.address,
    fullName: client.name,
    email: client.email,
    age: client.age
  })
    .then(response => {
      result(null, response)
    })
    .catch(err => {
      console.log(err);
      result(err, null)
    });
};

Client.remove = (id, result) => {
  knex('clients').where('id', id).del()
    .then(response => {
      result(null, response)
    })
    .catch(err => {
      result(err, null)
    });
};

module.exports = Client;