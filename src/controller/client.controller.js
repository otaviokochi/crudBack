const Client = require('../model/client.model');

const create = async (req, res) => {

  const client = new Client({
    email: req.body.email,
    name: req.body.name,
    cpf: req.body.cpf,
    address: req.body.address,
    age: req.body.age
  });

  const response = await Client.create(client)
    .catch(error => {
      console.log(error);
      if (error.code == 'ER_DUP_ENTRY') {
        res.status(400).send({ message: `Cliente de email ${client.email} já cadastrado` });
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

};

const findClients = async (req, res) => {
  if (req.query.fullName) {
    const response = await Client.getByName(req.query.fullName)
      .catch(error => {
        console.log(error);
        res.status(500).send({
          message: `Erro ao procurar cliente ${req.query.name}`
        });
        return new Error(error);
      })
    if (response instanceof Error) return;
    res.send(response);
  } else {
    const response = await Client.getAll()
      .catch(error => {
        res.status(500).send({
          message: error.message || "Erro ao recuperar os clientes"
        });
        return new Error(error);
      })
    if (response instanceof Error) return;
    res.send(response);
  }
};

const findClient = async (req, res) => {
  const response = await Client.findById(req.params.id)
    .catch(error => {
      console.log(error);
      res.status(500).send({
        message: `Erro ao procurar o cliente de id ${req.params.id}`
      });
    })
  if (response instanceof Error) return;
  res.send(response);
}

const deleteClient = async (req, res) => {
  const response = await Client.remove(req.params.id)
    .catch(error => {
      console.log(error);
      res.status(500).send({
        message: `Erro ao deletar o cliente de id: ${req.params.id}`
      });
      return new Error(error);
    })
  if (response instanceof Error) return;
  //response has the number of affected rows
  if (response > 0)
    res.send({ message: `Cliente de id ${req.params.id} deletado com sucesso!` });
  else
    res.status(400).send({ message: `Cliente de id ${req.params.id} não encontrado!` });
}

const update = async (req, res) => {
  const client = { ...req.body }
  const response = await Client.updateById(req.params.id, client)
    .catch(error => {
      console.log(error);
      res.status(500).send({
        message: `Erro ao atualizar o cliente de id: ${req.params.id}`
      });
      return new Error(error);
    })
  if (response instanceof Error) return;
  //response has the number of affected rows
  if (response > 0)
    res.send({ message: `Cliente de id ${req.params.id} alterado com sucesso!` });
  else
    res.status(400).send({ message: `Cliente de id ${req.params.id} não encontrado!` });
};

module.exports = {
  create,
  findClients,
  findClient,
  deleteClient,
  update
}