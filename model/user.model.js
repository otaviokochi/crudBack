const knex = require('../src/database/db')
const md5 = require('md5');

const User = function(user) {
    this.address = user.address;
    this.cpf = user.cpf;
    this.fullName = user.name;
    this.email = user.email;
    this.age = user.age;
    this.password = md5(user.password);
    this.login = user.login;
};

User.create = (newUser, result) => {
    knex('users').insert({
        address: newUser.address,
        cpf: newUser.cpf,
        fullName: newUser.fullName,
        email: newUser.email,
        age: newUser.age,
        password: newUser.password,
        login: newUser.login,
    })
    .then(response => result(null, response))
    .catch(err => result(err, null));
};

User.getAll = result => {
    knex('users')
        .then(response => result(null, response))
        .catch(err => result(err, null));
};

User.getByName = (userName, result) => {
    knex('users').where('fullName', 'like', `%${userName}%`)
        .then(response => {
            result(null, response)
        })
        .catch(err => result(err, null));
};

User.findByLogin = (login, result) => {
    knex('users').where('login', login)
        .then(response => result(null, response))
        .catch(err => result(err, null));
}

User.findById = (id, result) => {
    knex('users').where('id', id)
        .then(response => result(null, response))
        .catch(err => result(err, null));
};

User.updateById = (id, user, result) => {
    knex('users').where('id', id).update({
        address: user.address,
        cpf: user.cpf,
        fullName: user.name,
        email: user.email,
        age: user.age
    })
        .then(response => {
            result(null, response)
        })
        .catch(err => { 
            console.log(err);
            result(err, null)
        });
};

User.remove = (id, result) => {
    knex('users').where('id', id).del()
        .then(response => result(null, response))
        .catch(err => result(err, null));
};

module.exports = User;