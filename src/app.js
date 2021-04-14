const express = require('express');
const cors = require('cors');
const passport = require('passport');
const app = express();
require('dotenv').config();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require('./routes/authentication.routes')(app);

require("./routes/user.routes")(app);
require("./routes/client.routes")(app);


app.use(passport.initialize());

module.exports = app;