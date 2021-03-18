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


// const localStrategy = require('passport-local').Strategy;
// const User = require('../model/user.model');
// const md5 = require('md5');

// module.exports = function(passport) {
//   passport.use(
//     new localStrategy({usernameField: 'username', passwordField: 'password'}, (username, password, done) => {

//       User.findByLogin(username, (err, user) => {
//         if (err)  return done(err); 
//         if (user.length == 0)  return done(null, false, {message: 'Credenciais erradas!'});
//         if (md5(password) === user[0].password) return done(null, user[0]);
//         else return done(null, false, {message: 'Credenciais erradas!'});
//       })
//     })
//   );

//   passport.serializeUser((user, done) => {
//     return done(null, user.id);
//   });

//   passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => {
//       return done(err, user.username);
//     })
//   });

// }