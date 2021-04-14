process.env.NODE_ENV = 'test';

const knex = require('../database/db');
const request = require('supertest');
const app = require('../src/app');

describe("Authenticate api test", () => {
  it('Authenticate with a user that exists in database', async () => {
    const response = await request(app).post('/signin').send({
      login: 'otaviokochi',
      password: 'otaviokochi'
    })
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      login: 'otaviokochi',
      iat: expect.any(Number),
      exp: expect.any(Number),
      token: expect.any(String)
    });
  })
  
  it('Authenticate with a user that do not exists in database', async () => {
    const response = await request(app).post('/signin').send({
      login: "otavio",
      password: "otaviokochi"
    });
    expect(response.status).toBe(401);
    expect(response.error.text).toBe('Email/senha inválidos');
  })
  
  it('Authenticate with wrong parameter name', async () => {
    const response = await request(app).post('/signin').send({
      user: "otavio",
      password: "otaviokochi"
    });
    expect(response.status).toBe(401);
    expect(response.error.text).toBe('Email/senha inválidos');
  })
})
