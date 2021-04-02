const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");

let app = express();
app.set("view engine", "ejs");
app.set("views", "./app/views");

// const auth = (req, res, next) => {
//     if(req.url == "/login") {
//         if(req.cookies.logged) res.redirect("/");
//     } else if(req.url != "/cadastrar") {
//         if(!req.cookies.logged) res.redirect("/login");
//     }
    
//     next();
// }

// app.use(auth); // HABILITAR QUANDO COOKIES FOREM IMPLEMENTADOS

app.use(express.static("./app/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

consign()
    .include("app/routes")
    .then("config/dbConnection.js")
    .then("app/middlewares")
    .then("app/models")
    .then("app/controllers")
    .into(app);

module.exports = app;