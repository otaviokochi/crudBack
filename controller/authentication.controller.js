const { authSecret} = require('../.env');
const jwt = require('jwt-simple')
const User = require('../model/user.model');
const md5 = require('md5');
const knex = require('../src/database/db')

const signin = async (req, res) => {
  console.log(req.body)
  const user = await knex('users').where('login', req.body.login).first()
  if(!user) return res.status(401).send('Email/senha inválidos');

  const matchPassword = md5(req.body.password) === user.password;

  if(!matchPassword) return res.status(401).send('Email/senha inválidos');

  const now = Math.floor(Date.now() / 1000);

  const payload = {
    id: user.id,
    login: user.login,
    iat: now,
    exp: now + (60 * 60 * 24)
  }

  res.json({
    ...payload,
    token: jwt.encode(payload, authSecret)
  })
}

const validateToken = async (req, res) => {
  const userData = req.body || null;
  try {
    if(userData) {
      const token = jwt.decode(userData.token, authSecret);
      if(new Date(token.exp * 1000) > new Date()) {
        return res.send(true)
      }
    }
  } catch(err) {
    
  }
  res.send(false);
}

module.exports = {
  signin,
  validateToken
}
