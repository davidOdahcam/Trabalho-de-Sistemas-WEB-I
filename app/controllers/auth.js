module.exports.login = (app, req, res) => {
   res.render("login");
   //res.end("Faça o login!");
}

module.exports.signup = (app, req, res) => {
    const dados = req.body;

    const connection = app.config.dbConnection;
    const Auth = new app.app.models.auth(dados, connection);

    Auth.login((err, result) => {
        if(err) {
            console.log({message: "Erro na autenticação", err});
            res.render("login", {message: "Erro na autenticaçao"});
        } else {
            if(result.length > 0) {
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