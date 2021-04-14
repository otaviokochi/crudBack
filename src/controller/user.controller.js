const User = require('../model/user.model');
const bcrypt = require('bcrypt');

const create = async (req, res) => {
  const password = await bcrypt.hash(req.body.password, 10).catch(err => false);
  if (password) {
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
        if(err.code == 'ER_DUP_ENTRY') {
          console.log(err);
          if (err.sqlMessage.includes('users.users_email_unique'))
            res.status(400).send({ message: `Usuário de email ${req.body.email} já criado` });
          else 
            res.status(400).send({ message: `Usuário de login ${req.body.login} já criado` });
        } else if(err.code == 'ER_NO_DEFAULT_FOR_FIELD') {
          console.log(err);
          res.status(400).send({ message: 'Dados para criação faltando!' });
        } else {
          console.log(err);
          res.statusSend(500);
        }
      }
      else {
        //data has the id of the created user
        res.send(data);
      }
    })
  } else {
    res.status(400).send({ message: 'Dados para criação faltando!' });
  }
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
        res.status(400).send({ message: `Usuário de id ${req.params.id} não encontrado!` });
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
        res.status(400).send({ message: `Usuário de id ${req.params.id} não encontrado!` });
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