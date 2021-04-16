const knex = require('../../database/db')

const Client = function (client) {
  this.address = client.address;
  this.cpf = client.cpf;
  this.fullName = client.name;
  this.email = client.email;
  this.age = client.age
};

Client.create = (newClient) => new Promise((resolve, reject) => {
  knex('clients').insert({
    address: newClient.address,
    cpf: newClient.cpf,
    fullName: newClient.fullName,
    email: newClient.email,
    age: newClient.age,
  })
    .then(response => resolve(response))
    .catch(err => reject(err));

})

Client.getAll = () => new Promise((resolve, reject) => {
  knex('clients')
    .then(response => resolve(response))
    .catch(err => reject(err));

})

Client.getByName = (clientName,) => new Promise((resolve, reject) => {
  knex('clients').where('fullName', 'like', `%${clientName}%`)
    .then(response => resolve(response))
    .catch(err => reject(err));
})


Client.findById = (id,) => new Promise((resolve, reject) => {
  knex('clients').where('id', id)
    .first()
    .then(response => resolve(response))
    .catch(err => reject(err));
})


Client.updateById = (id, client,) => new Promise((resolve, reject) => {
  knex('clients').where('id', id).update({
    address: client.address,
    fullName: client.name,
    email: client.email,
    age: client.age
  })
    .then(response => resolve(response))
    .catch(err => reject(err));
})


Client.remove = (id,) => new Promise((resolve, reject) => {
  knex('clients').where('id', id).del()
    .then(response => resolve(response))
    .catch(err => reject(err));
})


module.exports = Client;