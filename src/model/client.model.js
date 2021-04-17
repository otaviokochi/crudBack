const knex = require('../../database/db')

const Client = function (client) {
  this.address = client.address;
  this.cpf = client.cpf;
  this.fullName = client.name;
  this.email = client.email;
  this.age = client.age
};

Client.create = async (newClient) =>
  knex('clients').insert({
    address: newClient.address,
    cpf: newClient.cpf,
    fullName: newClient.fullName,
    email: newClient.email,
    age: newClient.age,
  })

Client.getAll = async () =>
  knex('clients')

Client.getByName = async (clientName) =>
  knex('clients').where('fullName', 'like', `%${clientName}%`)

Client.findById = async (id) =>
  knex('clients').where('id', id)
    .first()

Client.updateById = async (id, client) =>
  knex('clients').where('id', id).update({
    address: client.address,
    fullName: client.name,
    email: client.email,
    age: client.age
  })

Client.remove = async (id) =>
  knex('clients').where('id', id).del()

module.exports = Client;