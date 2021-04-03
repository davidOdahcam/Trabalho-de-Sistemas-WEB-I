const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");

let app = express();

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.set((req, res, next) => {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    
    next();
});

app.use(express.static("./app/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressSession({
	secret: process.env.SESSION_SECRET,
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