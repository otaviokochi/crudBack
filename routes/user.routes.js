module.exports = app => {
    const users = require('../controller/user.controller');

    app.post('/users', users.create);

    app.get('/users', users.findUsers);

    app.get('/users/:id', users.findUser);

    app.delete('/users/:id', users.deleteUser);

    app.put('/users/:id', users.update);
}