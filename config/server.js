const express = require("express");
const consign = require("consign");

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

consign()
    .include("app/routes")
    .then("config/dbConnection.js")
    .then("app/middlewares")
    .then("app/models")
    .then("app/controllers")
    .into(app);

module.exports = app;