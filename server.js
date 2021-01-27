const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const app = express();
const port = 5000;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


require("./routes/user.routes")(app);
require("./routes/client.routes")(app);



app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))

app.use(cookieParser('secret'));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport.config.js')(passport);

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) return err;
    if (!user) res.send("Credenciais erradas!");
    else {
      req.logIn(user, err => {
        if (err) return err;
        res.send("Autenticação bem sucedida");
        console.log(req.user); 
      })
    }
  })(req,res,next)
})



app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
