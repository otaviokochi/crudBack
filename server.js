if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const app = express();
const port = 5000;


app.use(flash());
app.use(session({
  secret: process.env.SESSION,
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require("./routes/user.routes")(app);

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});