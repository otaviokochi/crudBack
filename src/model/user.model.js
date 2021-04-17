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

User.create = async (newUser) => 
  knex('users').insert({
    address: newUser.address,
    cpf: newUser.cpf,
    fullName: newUser.fullName,
    email: newUser.email,
    age: newUser.age,
    password: newUser.password,
    login: newUser.login,
  })

User.getAll = async () => 
  knex('users')
    .select('id', 'fullName', 'email', 'age', 'address')

User.getByName = async (userName) => 
  knex('users').where('fullName', 'like', `%${userName}%`)
    .select('id', 'fullName', 'email', 'age', 'address')


User.findById = async (id) => 
  knex('users').where('id', id)
    .select('id', 'fullName', 'email', 'age', 'address')
    .first()

User.updateById = async (id, user) => 
  knex('users').where('id', id).update({
    address: user.address,
    fullName: user.name,
    email: user.email,
    age: user.age
  })

User.remove = async (id) => 
  knex('users').where('id', id).del()

module.exports = User;