const sql = require('../config/db.config');

const User = function(user) {
    this.address = user.address;
    this.cpf = user.cpf;
    this.name = user.name;
    this.email = user.email;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO users set ?", newUser, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("created user: ", { id: res.insertId, ...newUser });
            result(null, { id: res.insertId, ...newUser });
        }
    });
};

User.getAll = result => {
    sql.query("SELECT * FROM users", (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("users: ", res);
            result(null, res);
        }
    });
};

User.getByName = (userName, result) => {
    sql.query("SELECT * FROM users WHERE name LIKE ?\"%\"", userName, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            if(res.length) {
                console.log("found users: ", res);
                result(null, res);
            } else {
                result({ kind: "not found"}, null);
            }
        }
    });
};

User.findById = (id, result) => {
    sql.query("SELECT * FROM users WHERE id = ?", id, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            if(res.length) {
                console.log("found user: ", res[0]);
                result(null, res[0]);
            } else {
                result({ kind: "not found"}, null);
            }
        }
    });
};

User.updateById = (id, user, result) => {
    sql.query("UPDATE users SET email = ?, name = ?, cpf = ?, address = ? WHERE id = ?", [user.email, user.name, user.cpf, user.address, id], (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            if(res.affectedRows == 0) {
                result({ kind: "not found"}, null);
            } else {
                console.log("updated user: ", { id: id, ...user });
                result(null, { id: id, ...user });
            }
        }
    });
};

User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            if(res.affectedRows == 0) {
                result({ kind: "not found"}, null)
            } else {
                console.log("deleted user with id: ", id);
                result(null, res);
            }
        }
    });
};

module.exports = User;