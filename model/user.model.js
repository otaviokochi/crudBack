const sql = require('../config/db.config');
const md5 = require('md5');

const User = function(user) {
    this.address = user.address;
    this.cpf = user.cpf;
    this.fullName = user.name;
    this.email = user.email;
    this.age = user.age;
    this.password = md5(user.password);
    this.login = user.login;
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
    sql.query("SELECT * FROM users WHERE fullName LIKE ?\"%\"", userName, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            if(res.length) {
                console.log("found users: ", res);
                result(null, res);
            } else {
                result(null, null);
            }
        }
    });
};

User.findByLogin = (login, result) => {
    sql.query("SELECT * FROM users WHERE login = ?", login, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            if(res.length) {
                console.log("found user: ", res);
                result(null, res);
            } else {
                result(null, null);
            }
        }
    })
}

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
                result(null, null);
            }
        }
    });
};

User.updateById = (id, user, result) => {
    sql.query("UPDATE users SET age = ?, email = ?, fullName = ?, cpf = ?, address = ? WHERE id = ?", [user.age, user.email, user.name, user.cpf, user.address, id], (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            if(res.affectedRows == 0) {
                result(null, null);
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
                result(null, null)
            } else {
                console.log("deleted user with id: ", id);
                result(null, res);
            }
        }
    });
};

module.exports = User;