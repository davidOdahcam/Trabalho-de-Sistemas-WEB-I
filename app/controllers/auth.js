module.exports.login = (app, req, res) => {
   res.render("login");
   //res.end("Faça o login!");
}

module.exports.signup = (app, req, res) => {
    const { validationResult } = require("express-validator"); // Chama a parte do módulo responsável pela entrega de erros
    const dados = req.body;
    const errorsArr = validationResult(req).array(); // Retorna um array contendo todos os erros
    if(errorsArr.length > 0) { // Checa se o array possui erros
        let errors = {}; // Para facilitar a validação no front é criado o objeto para melhor manipulação de índices
        errorsArr.forEach(err => {
            errors[err.param] = {msg: err.msg}; // neste exemplo: errors.email = {msg: "Campo Obrigatório"} // Caso a validação retorne esse erro
        });
        console.log(dados);
        return res.render("login", {user: dados, errors}); // Envia os erros e o valor dos dados enviados que falharam na validação
    }
    const connection = app.config.dbConnection;
    const Auth = new app.app.models.auth(dados, connection);
    Auth.login((err, result) => {
        if(err) {
            console.log({message: "Erro na autenticação", err});
            res.render("login", {message: "Erro na autenticaçao"});
        } else {
            if(result.length > 0) {
                result[0].birthdate = result[0].birthdate.toISOString().split("T").shift();
                req.session.authorized = true;
                req.session.user = result[0];
             
                res.redirect("/");
            } else {
                res.render("login", {user: dados, error: "Credenciais Inválidas"});
            }
        }
    });
}

module.exports.logout = (app, req, res) => {
    app.app.models.auth.logout(req, res);
}