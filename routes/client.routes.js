module.exports = app => {
  const client = require('../controller/client.controller');

  app.post('/clients', client.create);

  app.get('/clients', client.findClients);

  app.get('/clients/:id', client.findClient);

  app.delete('/clients/:id', client.deleteClient);

  app.put('/clients/:id', client.update);
}