const Client = require('../model/client.model');

const create = (req, res) => {

    const client = new Client({
        email: req.body.email,
        name: req.body.name,
        cpf: req.body.cpf,
        address: req.body.address,
        agr: req.body.age
    });

    Client.create(client, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the client"
            });
        }
        else {
            res.send(data);
        }
    })
};

const findClients = (req, res) => {
    // if (req.query.name) {
    //     Client.getByName(req.query.name, (err, data) => {
    //         if (err) {
    //             if (err.kind === "not found") {
    //                 res.status(404).send({
    //                     message: `Not found client with name ${req.query.name}`
    //                 });
    //             } else {
    //                 res.status(500).send({
    //                     message: `Error retrieving clients with name ${req.query.name}`
    //                 });
    //             }
    //         } else {
    //             res.send(data);
    //         }
    //     });
    // } else {
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
    // }
};

const findClient = (req, res) => {
    Client.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not found") {
                res.status(404).send({
                    message: `Not found client with id ${req.params.id}`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving client with id ${req.params.id}`
                });
            }
        } else {
            res.send(data);
        }
    })
}

const deleteClient = (req, res) => {
    Client.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not found") {
                res.status(404).send({
                    message: `Not found client with id ${req.params.id}`
                });
            } else {
                res.status(500).send({
                    message: `Error deleting client with id: ${req.params.id}`
                });
            }
        } else {
            res.send({ message: 'Client was successfully deleted!' });
        }
    })
}

const update = (req, res) => {

    Client.updateById(req.params.id, new Client(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not found") {
                res.status(400).send({
                    message: `Not found client with id ${req.params.id}`
                });
            } else {
                res.status(500).send({
                    message: `Error updating client with id: ${req.params.id}`
                });
            }
        } else {
            res.send(data);
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