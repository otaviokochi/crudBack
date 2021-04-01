module.exports = app => {
  const client = require('../controller/client.controller');
  const {authenticate} = require('../config/passport.config'); 
  
  app.route('/clients')
    .all(authenticate())
    .post(client.create)
    .get(client.findClients)
  
  app.route('/clients/:id')
    .all(authenticate())
    .get(client.findClient)
    .delete(client.deleteClient)
    .put(client.update)
  
}