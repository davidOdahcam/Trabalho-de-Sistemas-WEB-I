const express = require("express");
const consign = require("consign");

let app = express();
app.set("view engine", "ejs");
app.set("views", "./app/views");

// app.use("teste", (req, res, next) => {
//     console.log("Middleware");
//     next();
// })

// app.use((req, res, next) => {
//     console.log(req.url);
    
//     next();
// });

// app.set('teste', () =>
//     (req, res, next) => {
//         console.log(109);
//         next();
//     }
// ); // IMPLEMENTAÇÃO EXPERIEMNTAL DE MIDDLEWARES 

app.use(express.static("./app/public"));

consign()
    .include("app/routes")
    .then("config/dbConnection.js")
    .then("app/models")
    .then("app/controllers")
    .into(app);

module.exports = app;