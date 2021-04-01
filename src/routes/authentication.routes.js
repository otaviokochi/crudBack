module.exports = app => {
  const {signin, validateToken} = require('../controller/authentication.controller');
  app.post('/signin', signin)
  app.post('/validateToken', validateToken)
}