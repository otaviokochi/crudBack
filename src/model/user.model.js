const knex = require('../../database/db');

const User = function (user) {
  this.address = user.address;
  this.cpf = user.cpf;
  this.fullName = user.name;
  this.email = user.email;
  this.age = user.age;
  this.password = user.password;
  this.login = user.login;
};

User.create = (newUser) => new Promise((resolve, reject) => {
  knex('users').insert({
    address: newUser.address,
    cpf: newUser.cpf,
    fullName: newUser.fullName,
    email: newUser.email,
    age: newUser.age,
    password: newUser.password,
    login: newUser.login,
  })
    .then(response => resolve(response))
    .catch(err => reject(err));
})


User.getAll = () => new Promise((resolve, reject) => {
  knex('users')
    .select('id', 'fullName', 'email', 'age', 'address')
    .then(response => resolve(response))
    .catch(err => reject(err));
})


User.getByName = (userName) => new Promise((resolve, reject) => {
  knex('users').where('fullName', 'like', `%${userName}%`)
    .select('id', 'fullName', 'email', 'age', 'address')
    .then(response => {
      resolve(response)
    })
    .catch(err => reject(err));
})


User.findById = (id) => new Promise((resolve, reject) => {
  knex('users').where('id', id)
    .select('id', 'fullName', 'email', 'age', 'address')
    .first()
    .then(response => resolve(response))
    .catch(err => reject(err));
})


User.updateById = (id, user) => new Promise((resolve, reject) => {
  knex('users').where('id', id).update({
    address: user.address,
    fullName: user.name,
    email: user.email,
    age: user.age
  })
    .then(response => resolve(response))
    .catch(err => reject(err));
})


User.remove = (id) => new Promise((resolve, reject) => {
  knex('users').where('id', id).del()
    .then(response => resolve(response))
    .catch(err => reject(err));
})


module.exports = User;