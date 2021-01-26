module.exports = app => {
  const client = require('../controller/client.controller');

  app.post('/client', client.create);

  app.get('/client', client.findClient);

  app.get('/client/:id', client.findOne);

  app.delete('/client/:id', client.deleteClient);

  app.put('/client/:id', client.update);
}