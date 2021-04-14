const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const knex = require('../../database/db');
const { response } = require('express');

const signin = async (req, res) => {
  if (!req.body.login || !req.body.password) return res.status(401).send('Email/senha inválidos');

  const user = await knex('users').where('login', req.body.login).first().catch(err => {
    console.log(err);
    return false;
  });
  if (!user) return res.status(401).send('Email/senha inválidos');

  const matchPassword = await bcrypt.compare(req.body.password, user.password).catch(err => {
    console.log(err);
    return false;
  });

  if (!matchPassword) return res.status(401).send('Email/senha inválidos');

  const now = Math.floor(Date.now() / 1000);

  const payload = {
    id: user.id,
    login: user.login,
    iat: now,
    exp: now + (60 * 60 * 24 * 3)
  }

  res.json({
    ...payload,
    token: jwt.encode(payload, process.env.AUTH_SECRET)
  })
}

const validateToken = async (req, res) => {
  const userData = req.body || null;
  if (userData) {
    try {
      const token = jwt.decode(userData.token, process.env.AUTH_SECRET);
      if (token) { 
        if (new Date(token.exp * 1000) > new Date()) {
          return res.send(true);
        }
      }
    } catch (err) {
      res.status(401).send(false);
    }
  }
}

module.exports = {
  signin,
  validateToken
}
