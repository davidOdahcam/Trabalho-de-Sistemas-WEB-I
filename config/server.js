const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");

let app = express();
app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.static("./app/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressSession({
	secret: 'whEjkaslJHKlsap09Io',
	resave: false,
	saveUninitialized: false 
}));

consign()
    .include("app/routes")
    .then("config/dbConnection.js")
    .then("app/middlewares")
    .then("app/models")
    .then("app/controllers")
    .into(app);

module.exports = app;