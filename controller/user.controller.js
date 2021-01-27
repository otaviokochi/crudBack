const User = require('../model/user.model');

const create = (req, res) => {

    const user = new User({
        email: req.body.email,
        name: req.body.name,
        cpf: req.body.cpf,
        address: req.body.address,
        age: req.body.age,
        login: req.body.login,
        password: req.body.password
    });

    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user"
            });
        }
        else {
            res.send(data);
        }
    })
};

const findUsers = (req, res) => {
    if (req.query.fullName) {
        User.getByName(req.query.fullName, (err, data) => {
            if (err) {
                if (err.kind === "not found") {
                    res.status(404).send({
                        message: `Not found user with name ${req.query.name}`
                    });
                } else {
                    res.status(500).send({
                        message: `Error retrieving users with name ${req.query.name}`
                    });
                }
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
            if (err.kind === "not found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.id}`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving user with id ${req.params.id}`
                });
            }
        } else {
            res.send(data);
        }
    })
}

const deleteUser = (req, res) => {
    User.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.id}`
                });
            } else {
                res.status(500).send({
                    message: `Error deleting user with id: ${req.params.id}`
                });
            }
        } else {
            res.send({ message: 'User was successfully deleted!' });
        }
    })
}

const update = (req, res) => {
    const user = {...req.body}
    User.updateById(req.params.id, user, (err, data) => {
        if (err) {
            if (err.kind === "not found") {
                res.status(400).send({
                    message: `Not found user with id ${req.params.id}`
                });
            } else {
                res.status(500).send({
                    message: `Error updating user with id: ${req.params.id}`
                });
            }
        } else {
            res.send(data);
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