const User = require('../model/user.model');
const bcrypt = require('bcrypt');

const create = async (req, res) => {
  const password = await bcrypt.hash(req.body.password, 10).catch(error => false);
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

    const response = await User.create(user)
      .catch(error => {
        console.log(error);
        if (error.code == 'ER_DUP_ENTRY') {
          if (error.sqlMessage.includes('users.users_email_unique'))
            res.status(400).send({ message: `Usuário de email ${req.body.email} já criado` });
          else
            res.status(400).send({ message: `Usuário de login ${req.body.login} já criado` });
        } else if (error.code == 'ER_NO_DEFAULT_FOR_FIELD') {
          res.status(400).send({ message: 'Dados para criação faltando!' });
        } else {
          res.statusSend(500);
        }
        return new Error(error);
      })
    if (response instanceof Error) return;
    //response has the id of the created user
    res.send(response);
  } else {
    res.status(400).send({ message: 'Dados para criação faltando!' });
  }
};

const findUsers = async (req, res) => {
  if (req.query.fullName) {
    const response = await User.getByName(req.query.fullName)
      .catch(error => {
        console.log(error);
        res.status(500).send({
          message: `Erro ao recuperar o usuário ${req.query.name}`
        });
      })
    if (response instanceof Error) return;
    res.send(response);
  } else {
    const response = await User.getAll()
      .catch(error => {
        console.log(error);
        res.status(500).send({
          message: error.message || "Some error occurred while retrieving users"
        });
      })
    if (response instanceof Error) return;
    res.send(response);
  }
};

const findUser = async (req, res) => {
  const response = await User.findById(req.params.id,)
    .catch(error => {
      console.log(error);
      res.status(500).send({
        message: `Erro ao recuperar o usuário de id ${req.params.id}`
      });
    })
  if (response instanceof Error) return;
  res.send(response);
}

const deleteUser = async (req, res) => {
  const response = await User.remove(req.params.id,)
    .catch(error => {
      console.log(error);
      res.status(500).send({
        message: `Erro ao deletar o usuário de id: ${req.params.id}`
      });
    })
  if (response instanceof Error) return;
  //response has the number of affected rows
  if (response > 0)
    res.send({ message: `Usuário de id ${req.params.id} deletado com sucesso!` });
  else
    res.status(400).send({ message: `Usuário de id ${req.params.id} não encontrado!` });

}

const update = async (req, res) => {
  const user = { ...req.body }
  const response = await User.updateById(req.params.id, user,)
    .catch(error => {
      console.log(error);
      res.status(500).send({
        message: `Erro ao atualizar o usuário de id: ${req.params.id}`
      });
    })
  if (response instanceof Error) return;

  //response has the number of affected rows
  if (response > 0)
    res.send({ message: `Usuário de id ${req.params.id} alterado com sucesso!` });
  else
    res.status(400).send({ message: `Usuário de id ${req.params.id} não encontrado!` });
};

module.exports = {
  create,
  findUsers,
  findUser,
  deleteUser,
  update,
}