module.exports = app => {
  const users = require('../controller/user.controller');
  const {authenticate}  = require('../config/passport.config');

  app.route('/users')
    .all(authenticate())
    .get(users.findUsers)
    .post(users.create)

  app.route('/users/:id')
    .all(authenticate())
    .get(users.findUser)
    .delete(users.deleteUser)
    .put(users.update)

}