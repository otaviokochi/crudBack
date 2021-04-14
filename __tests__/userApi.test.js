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

describe("Test users api", () => {
  const userDatabase = [
    {
      id: 1,
      fullName: 'otavio',
      email: 'otavio@kochi',
      age: 44,
      address: 'osvaldo cruz',
    },
    {
      id: 2,
      fullName: 'otavio',
      email: 'teste@kochi',
      age: 44,
      address: 'osvaldo cruz',
    },
  ]
  it("Test get all users", async () => {
    const users = await request(app).get('/users').set("Authorization", `bearer ${token}`);
    expect(users.status).toBe(200);
    expect(users.body).toEqual(userDatabase);
  })

  it("Test get with id", async () => {
    const users = await request(app).get('/users/1').set("Authorization", `bearer ${token}`);
    expect(users.status).toBe(200);
    expect(users.body).toEqual(userDatabase[0]);
  })

  it("Test get with id that does not exists", async () => {
    const users = await request(app).get('/users/5').set("Authorization", `bearer ${token}`);
    expect(users.status).toBe(200);
    expect(users.body).toEqual({});
  })

  it("Test get with name that does not exists", async () => {
    const users = await request(app).get('/users?fullName=ana').set("Authorization", `bearer ${token}`);
    expect(users.status).toBe(200);
    expect(users.body).toEqual([]);
  })

  it("Test create user", async () => {
    const users = await request(app).post('/users').send({
      email: 'newClient@newClient.com',
      name: "newClient",
      cpf: "0000",
      address: "pppp",
      age: 10,
      login: 'newclient',
      password: 'newclient'
    }).set("Authorization", `bearer ${token}`);
    expect(users.status).toBe(200);
    expect(users.body).toEqual([3]);
  })

  it("Test create user that already exists", async () => {
    const users = await request(app).post('/users').send({
      email: 'otavio@kochi',
      name: 'otavio',
      age: 44,
      address: 'osvaldo cruz',
      cpf: '0000',
      login: 'otaviokochi',
      password: '$2b$10$wM57obIBLX9hMSWRcwOPPei0WpMfD/yA3L.e9.ZZSnpM8CP9FRUEO'
    }).set("Authorization", `bearer ${token}`);
    expect(users.status).toBe(400);
    expect(users.body.message).toBe('Usuário de email otavio@kochi já criado');
  })

  it("Test create user with missing params", async () => {
    const users = await request(app).post('/users').send({
      name: 'asdfasdf',
      email: 'asdf@asdf',
      age: 44,
      cpf: '0000',
    }).set("Authorization", `bearer ${token}`);
    expect(users.status).toBe(400);
    expect(users.body.message).toBe('Dados para criação faltando!');
  })

  it("Test update user", async () => {
    const users = await request(app).put('/users/2').send({
      name: 'asdfasdf',
      email: 'asdf@asdf',
      age: 44,
    }).set("Authorization", `bearer ${token}`);
    expect(users.status).toBe(200);
    expect(users.body.message).toBe(`Usuário de id 2 alterado com sucesso!`);
  })

  it("Test update user that does not exist", async () => {
    const users = await request(app).put('/users/56').send({
      name: 'asdfasdf',
      email: 'asdf@asdf',
      age: 44,
    }).set("Authorization", `bearer ${token}`);
    expect(users.status).toBe(400);
    expect(users.body.message).toBe(`Usuário de id 56 não encontrado!`);
  })

  it("Test delete user", async () => {
    const users = await request(app).delete('/users/2').set("Authorization", `bearer ${token}`);
    expect(users.status).toBe(200);
    expect(users.body.message).toBe(`Usuário de id 2 deletado com sucesso!`);
  })

  it("Test delete user that does not exist", async () => {
    const users = await request(app).delete('/users/56').set("Authorization", `bearer ${token}`);
    expect(users.status).toBe(400);
    expect(users.body.message).toBe(`Usuário de id 56 não encontrado!`);
  })

})
