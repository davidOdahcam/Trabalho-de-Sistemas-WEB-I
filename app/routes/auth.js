module.exports = (app) => {
    const { body } = require("express-validator"); // Chama a parte do módulo referente aos middlewares do body da requisição (formulários)

    app.get("/login", (req, res) => {
        if(req.session.authorized) {
            res.redirect("/?message=-4");
        } else {
            app.app.controllers.auth.login(app, req, res);
        }
    });

    app.post("/login", [ // Aplica os middlewares responsáveis pela autenticação
        body("email", "Campo Obrigatório").notEmpty(), // Checa se o campo "email" não está vazio e evnia a mensagem caso esteja
        body("password", "Campo Obrigatório").notEmpty() // Checa se o campo "password" não está vazio e ...
    ], (req, res) => {
        app.app.controllers.auth.signup(app, req, res);
    });

    app.get("/logout", (req, res) => {
        app.app.controllers.auth.logout(app, req, res);
    });
}