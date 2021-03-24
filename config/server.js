const express = require("express");
const consign = require("consign");

let app = express();
app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.static("./app/public"));

consign()
    .include("app/routes")
    .then("app/models")
    .then("app/controllers")
    .into(app);

module.exports = app;