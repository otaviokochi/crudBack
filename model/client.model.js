const sql = require('../config/db.config');

const Client = function(client) {
    this.address = client.address;
    this.cpf = client.cpf;
    this.name = client.name;
    this.email = client.email;
};

Client.create = (newClient, result) => {
    sql.query("INSERT INTO clients set ?", newClient, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("created client: ", { id: res.insertId, ...newClient });
            result(null, { id: res.insertId, ...newClient });
        }
    });
};

Client.getAll = result => {
    sql.query("SELECT * FROM clients", (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("clients: ", res);
            result(null, res);
        }
    });
};

Client.getByName = (clientName, result) => {
    sql.query("SELECT * FROM clients WHERE name LIKE ?\"%\"", clientName, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            if(res.length) {
                console.log("found clients: ", res);
                result(null, res);
            } else {
                result({ kind: "not found"}, null);
            }
        }
    });
};

Client.findById = (id, result) => {
    sql.query("SELECT * FROM clients WHERE id = ?", id, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            if(res.length) {
                console.log("found client: ", res[0]);
                result(null, res[0]);
            } else {
                result({ kind: "not found"}, null);
            }
        }
    });
};

Client.updateById = (id, client, result) => {
    sql.query("UPDATE clients SET email = ?, name = ?, cpf = ?, address = ? WHERE id = ?", [client.email, client.name, client.cpf, client.address, id], (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            if(res.affectedRows == 0) {
                result({ kind: "not found"}, null);
            } else {
                console.log("updated client: ", { id: id, ...client });
                result(null, { id: id, ...client });
            }
        }
    });
};

Client.remove = (id, result) => {
    sql.query("DELETE FROM clients WHERE id = ?", id, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            if(res.affectedRows == 0) {
                result({ kind: "not found"}, null)
            } else {
                console.log("deleted client with id: ", id);
                result(null, res);
            }
        }
    });
};

module.exports = Client;