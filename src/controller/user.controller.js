const User = require('../model/user.model');
const bcrypt = require('bcrypt');

const create = async (req, res) => {
  const password = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    cpf: req.body.cpf,
    address: req.body.address,
    age: req.body.age,
    login: req.body.login,
    password: password
  });

  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Erro ao criar o usuário"
      });
    }
    else {
      //data has the id of the created user
      res.send(data);
    }
  })
};

const findUsers = (req, res) => {
  if (req.query.fullName) {
    User.getByName(req.query.fullName, (err, data) => {
      if (err) {
        res.status(500).send({
          message: `Erro ao recuperar o usuário ${req.query.name}`
        });
      } else {
        res.send(data);
      }
    });
  } else {
    User.getAll((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving users"
        });
      }
      else {
        res.send(data);
      }
    });
  }
};

const findUser = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: `Erro ao recuperar o usuário de id ${req.params.id}`
      });
    } else {
      res.send(data);
    }
  })
}

const deleteUser = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: `Erro ao deletar o usuário de id: ${req.params.id}`
      });
    } else {
      //data has the number of affected rows
      if (data > 0)
        res.send({ message: `Usuário de id ${req.params.id} deletado com sucesso!` });
      else
        res.send({ message: `Usuário de id ${req.params.id} não encontrado!` });
    }
  })
}

const update = (req, res) => {
  const user = { ...req.body }
  User.updateById(req.params.id, user, (err, data) => {
    if (err) {
      res.status(500).send({
        message: `Erro ao atualizar o usuário de id: ${req.params.id}`
      });
    } else {
      //data has the number of affected rows
      if (data > 0)
        res.send({ message: `Usuário de id ${req.params.id} alterado com sucesso!` });
      else
        res.send({ message: `Usuário de id ${req.params.id} não encontrado!` });
    }
  });
};

module.exports = {
  create,
  findUsers,
  findUser,
  deleteUser,
  update,
}