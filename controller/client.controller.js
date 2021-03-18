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
      res.status(500).send({
        message: err.message || "Some error occurred while creating the client"
      });
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
          message: `Error retrieving clients with name ${req.query.name}`
        });
      } else {
        res.send(data);
      }
    });
  } else {
    Client.getAll((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving clients"
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
        message: `Error retrieving client with id ${req.params.id}`
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
        message: `Error deleting client with id: ${req.params.id}`
      });
    } else {
      //data has the number of affected rows
      if (data > 0)
        res.send({ message: `Cliente de id ${req.params.id} deletado com sucesso!` });
      else
        res.send({ message: `Cliente de id ${req.params.id} não encontrado!` });
    }
  })
}

const update = (req, res) => {
  const client = { ...req.body }
  Client.updateById(req.params.id, client, (err, data) => {
    if (err) {
      res.status(500).send({
        message: `Error updating client with id: ${req.params.id}`
      });
    } else {
      //data has the number of affected rows
      if (data > 0) {
        res.send({ message: `Cliente de id ${req.params.id} alterado com sucesso!` });
      }
      else
        res.send({ message: `Cliente de id ${req.params.id} não encontrado!` });
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