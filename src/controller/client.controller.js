const Client = require('../model/client.model');

const create = (req, res) => {

  const client = new Client({
    email: req.body.email,
    name: req.body.name,
    cpf: req.body.cpf,
    address: req.body.address,
    age: req.body.age
  });

  Client.create(client, (err, data) => {
    if (err) {
      if(err.code == 'ER_DUP_ENTRY') {
        console.log(err);
        res.status(400).send({ message: `Cliente de email ${client.email} já cadastrado` });
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

};

const findClients = (req, res) => {
  if (req.query.fullName) {
    Client.getByName(req.query.fullName, (err, data) => {
      if (err) {
        res.status(500).send({
          message: `Erro ao procurar cliente ${req.query.name}`
        });
      } else {
        res.send(data);
      }
    });
  } else {
    Client.getAll((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Erro ao recuperar os clientes"
        });
      }
      else {
        res.send(data);
      }
    });
  }
};

const findClient = (req, res) => {
  Client.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: `Erro ao procurar o cliente de id ${req.params.id}`
      });
    } else {
      res.send(data);
    }
  })
}

const deleteClient = (req, res) => {
  Client.remove(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: `Erro ao deletar o cliente de id: ${req.params.id}`
      });
    } else {
      //data has the number of affected rows
      if (data > 0)
        res.send({ message: `Cliente de id ${req.params.id} deletado com sucesso!` });
      else
        res.status(400).send({ message: `Cliente de id ${req.params.id} não encontrado!` });
    }
  })
}

const update = (req, res) => {
  const client = { ...req.body }
  Client.updateById(req.params.id, client, (err, data) => {
    if (err) {
      res.status(500).send({
        message: `Erro ao atualizar o cliente de id: ${req.params.id}`
      });
    } else {
      //data has the number of affected rows
      if (data > 0) {
        res.send({ message: `Cliente de id ${req.params.id} alterado com sucesso!` });
      }
      else
        res.status(400).send({ message: `Cliente de id ${req.params.id} não encontrado!` });
    }
  });
};

module.exports = {
  create,
  findClients,
  findClient,
  deleteClient,
  update
}