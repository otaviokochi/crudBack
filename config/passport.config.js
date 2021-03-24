const passport = require('passport');
const { authSecret } = require('../.env');
const passportJwt = require('passport-jwt');
const { Strategy, ExtractJwt } = passportJwt;
const User = require('../controller/user.controller')
const knex = require('../src/database/db')

const params = {
  secretOrKey: authSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const strategy = new Strategy(params, (payload, done) => {
  knex('users')
    .where('id', payload.id)
    .first()
    .then(user => {
      if (!user) return done(null, false);
      if (user.login === payload.login) return done(null, { ...payload });
      else return done(null, false);
    })
    .catch(err => done(err, false))
})

passport.use(strategy);

const authenticate = () => passport.authenticate('jwt', { session: false })

module.exports = {
  authenticate
}