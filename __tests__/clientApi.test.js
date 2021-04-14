process.env.NODE_ENV = 'test';

const knex = require('../database/db');
const request = require('supertest');
const app = require('../src/app');
let token;

beforeAll(async () => {
  token = await request(app).post('/signin').send({
    login: "otaviokochi",
    password: "otaviokochi"
  }).then(response => response.body.token)
})

beforeEach(async () => {
  return await knex('clients').del()
    .then(function () {
      return knex('clients').insert([
        {
          id: 1,
          fullName: 'otavio',
          email: 'otavio@kochi',
          age: 44,
          address: 'osvaldo cruz',
          cpf: '0000',
        },
        {
          id: 2,
          fullName: 'jose',
          email: 'jose@jose',
          age: 22,
          address: 'osvaldo cruz',
          cpf: '0000',
        },
        {
          id: 3,
          fullName: 'joao',
          email: 'joao@joao',
          age: 22,
          address: 'osvaldo cruz',
          cpf: '0000',
        }
      ]);
    });
})

describe("Test clients api", () => {
  const databaseClients = [
    {
      id: 1,
      fullName: 'otavio',
      email: 'otavio@kochi',
      age: 44,
      address: 'osvaldo cruz',
      cpf: '0000',
    },
    {
      id: 2,
      fullName: 'jose',
      email: 'jose@jose',
      age: 22,
      address: 'osvaldo cruz',
      cpf: '0000',
    },
    {
      id: 3,
      fullName: 'joao',
      email: 'joao@joao',
      age: 22,
      address: 'osvaldo cruz',
      cpf: '0000',
    }
  ]
  it("Test get all clients", async () => {
    const clients = await request(app).get('/clients').set("Authorization", `bearer ${token}`);
    expect(clients.status).toBe(200);
    expect(clients.body).toEqual(databaseClients);
  })

  it("Test get with id", async () => {
    const clients = await request(app).get('/clients/1').set("Authorization", `bearer ${token}`);
    expect(clients.status).toBe(200);
    expect(clients.body).toEqual(databaseClients[0]);
  })

  it("Test get with name", async () => {
    const clients = await request(app).get('/clients?fullName=jo').set("Authorization", `bearer ${token}`);
    expect(clients.status).toBe(200);
    expect(clients.body).toEqual([{ ...databaseClients[1] }, { ...databaseClients[2] }]);
  })

  it("Test get with id that does not exists", async () => {
    const clients = await request(app).get('/clients/5').set("Authorization", `bearer ${token}`);
    expect(clients.status).toBe(200);
    expect(clients.body).toEqual({});
  })

  it("Test get with name that does not exists", async () => {
    const clients = await request(app).get('/clients?fullName=ana').set("Authorization", `bearer ${token}`);
    expect(clients.status).toBe(200);
    expect(clients.body).toEqual([]);
  })

  it("Test create client", async () => {
    const clients = await request(app).post('/clients').send({
      email: 'newClient@newClient.com',
      name: "newClient",
      cpf: "0000",
      address: "pppp",
      age: 10
    }).set("Authorization", `bearer ${token}`);
    expect(clients.status).toBe(200);
    expect(clients.body).toEqual([4]);
  })

  it("Test create client that already exists", async () => {
    const clients = await request(app).post('/clients').send({
      name: 'otavio',
      email: 'otavio@kochi',
      age: 44,
      address: 'osvaldo cruz',
      cpf: '0000',
    }).set("Authorization", `bearer ${token}`);
    expect(clients.status).toBe(400);
    expect(clients.body.message).toBe('Cliente de email otavio@kochi já cadastrado');
  })

  it("Test create client with missing params", async () => {
    const clients = await request(app).post('/clients').send({
      name: 'asdfasdf',
      email: 'asdf@asdf',
      age: 44,
      cpf: '0000',
    }).set("Authorization", `bearer ${token}`);
    expect(clients.status).toBe(400);
    expect(clients.body.message).toBe('Dados para criação faltando!');
  })

  it("Test update client", async () => {
    const clients = await request(app).put('/clients/1').send({
      name: 'asdfasdf',
      email: 'asdf@asdf',
      age: 44,
      address: 'oapskdfp'
    }).set("Authorization", `bearer ${token}`);
    expect(clients.status).toBe(200);
    expect(clients.body.message).toBe(`Cliente de id 1 alterado com sucesso!`);
  })

  it("Test update client that does not exist", async () => {
    const clients = await request(app).put('/clients/56').send({
      name: 'asdfasdf',
      email: 'asdf@asdf',
      age: 44,
      address: 'oapskdfp'
    }).set("Authorization", `bearer ${token}`);
    expect(clients.status).toBe(400);
    expect(clients.body.message).toBe(`Cliente de id 56 não encontrado!`);
  })
  
  it("Test delete client", async () => {
    const clients = await request(app).delete('/clients/1').set("Authorization", `bearer ${token}`);
    expect(clients.status).toBe(200);
    expect(clients.body.message).toBe(`Cliente de id 1 deletado com sucesso!`);
  })

  it("Test delete client that does not exist", async () => {
    const clients = await request(app).delete('/clients/56').set("Authorization", `bearer ${token}`);
    expect(clients.status).toBe(400);
    expect(clients.body.message).toBe(`Cliente de id 56 não encontrado!`);
  })

})
