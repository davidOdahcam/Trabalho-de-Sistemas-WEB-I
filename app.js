//const app = require("./config/server.js");

const http = require("http");
const fs = require("fs");
const app = require("./config/server.js");
const url = require("url");
const PORT = process.env.PORT || 80;

http.createServer((req, res) => {
    // res.writeHead(200, {"Content-Type": "application/json"});
    // res.end('{"teste": 10}');
    // app.controllers.auth.login(app, req, res);
    
    // res.write(`${req.method} ${req.url}`);
    // res.end();

    app.router(req, res);
    
    res.end("CHEGUEI!");
}).listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
})