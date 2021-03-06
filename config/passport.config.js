const localStrategy = require('passport-local').Strategy;
const User = require('../model/user.model');
const md5 = require('md5');

module.exports = function(passport) {
  passport.use(
    new localStrategy({usernameField: 'username', passwordField: 'password'}, (username, password, done) => {

      User.findByLogin(username, (err, user) => {
        if (err)  return done(err); 
        if (user.length == 0)  return done(null, false, {message: 'Credenciais erradas!'});
        if (md5(password) === user[0].password) return done(null, user[0]);
        else return done(null, false, {message: 'Credenciais erradas!'});
      })
    })
  );

  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      return done(err, user.username);
    })
  });

}