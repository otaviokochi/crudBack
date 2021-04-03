const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const knex = require('../../database/db');

const signin = async (req, res) => {
  console.log(req.body)
  const user = await knex('users').where('login', req.body.login).first().catch(err => false);
  if(!user) return res.status(401).send('Email/senha inválidos');

  const matchPassword = await bcrypt.compare(req.body.password, user.password).catch(err => false);

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
    token: jwt.encode(payload, process.env.AUTH_SECRET)
  })
}

const validateToken = async (req, res) => {
  const userData = req.body || null;
  if(userData) {
    const token = jwt.decode(userData.token, process.env.AUTH_SECRET);
    if(new Date(token.exp * 1000) > new Date()) {
      return res.send(true);
    }
  }
  res.send(false);
}

module.exports = {
  signin,
  validateToken
}
