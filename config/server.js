/*const express = require("express");
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
*/

const fs = require('fs');

const app = {
    controllers: {},
    models: {},
    routes: {},
    config: {}
};

files = fs.readdirSync("app/controllers").filter((file) => file.endsWith(".js"));

for(let file of files) {
    methodName = file.slice(0, file.indexOf('.'));
    app.controllers[methodName] = require(`../app/controllers/${file}`);
}

files = fs.readdirSync("app/models").filter((file) => file.endsWith(".js"));

for(let file of files) {
    methodName = file.slice(0, file.indexOf('.'));
    app.models[methodName] = require(`../app/models/${file}`);
}

files = fs.readdirSync("app/routes").filter((file) => file.endsWith(".js"));

for(let file of files) {
    methodName = file.slice(0, file.indexOf('.'));
    app.routes[methodName] = require(`../app/routes/${file}`);
}

files = fs.readdirSync("config").filter((file) => file.endsWith(".js"));

for(let file of files) {
    app.config.dbConnection = require(`./dbConnection.js`);
}

const queryMaker = (url) => {
    let rawQuery = url.split("?").pop().split("&");
    let query = {};

    for(let attribute of rawQuery) {
        attribute = attribute.split("=");
        query[attribute[0]] = attribute[1]; 
    }

    return query;
}

const paramsMaker = (url) => {
    
}

app.router = (req, res) => {
    req.query = queryMaker(req.url);
    // req.params = paramsMaker(req.url);

    console.log(req);

    // let notFound = true;
    // console.log(req.url)
    // for(let route in app.routes) {
    //     request_url = app.routes["user"][req.method][req.url];

    //     if(request_url) {
    //         notFound = false;
    //         request_url.callback(app, req, res);
    //         break;
    //     }
    // }

    // if(notFound) {
    //     res.writeHead(404);
    //     res.write("A página que você procura não existe!");
    //     res.end();
    // }
}

module.exports = app;