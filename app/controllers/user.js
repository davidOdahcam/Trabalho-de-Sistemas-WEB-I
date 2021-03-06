
module.exports.index = (app, req, res) => {

    const messages = Object.freeze({
        "-4": "O usuário já está logado",
        "-3": "Erro no logout",
        "-2": "Acesso Negado",
        "-1": "Algo deu errado durante a execução da query",
        "0": "Usuário adicionado com sucesso",
        "1": "Usuário atualizado com sucesso",
        "2": "Usuário deletado com sucesso",
        "3": "Logout realizado com sucesso"
    });

    if (req.query.message) {
        res.render("index", { message: messages[req.query.message], auth: req.session.user });
    } else {
        res.render("index", { auth: req.session.user });
    }
}

module.exports.search = (app, req, res) => {
    const name = req.body.name;

    const connection = app.config.dbConnection;
    const User = new app.app.models.user(null, connection);

    User.selectUsers(name, (err, result) => {
        if (err) {
            console.log({ message: "Algo deu errado durante uma query", err: err })
            res.redirect("/?message=-1");
        } else {
            res.render("index", { users: result, search: true, auth: req.session.user });
        }
    })
}

module.exports.create = (app, req, res) => {
    res.render("create");
}

module.exports.store = (app, req, res) => {
    let { confirm_password, ...dados } = req.body; // "dados" contem o valor de todos os inputs menos de "confirm_password"
    let error = {};

    error = app.app.models.validator.validate(dados, confirm_password);

    if (Object.keys(error).length != 0) return res.render("create", { user: dados, error });

    if (dados.birthdate == '') dados.birthdate = null;

    const connection = app.config.dbConnection;
    const User = new app.app.models.user(dados, connection);

    confirm_password = undefined;

    User.checkEmail((err, result) => {
        if (err) {
            console.log({ message: "Algo deu errado durante uma query", err: err })
            res.redirect("/?message=-1");
        } else {
            if (result.length > 0) {
                error.email = "Email já cadastrado";
                res.render("create", { user: dados, error });
            } else {
                User.create((err, result) => {
                    if (err) {
                        console.log({ message: "Algo deu errado durante uma query", err: err })
                        res.redirect("/?message=-1");
                    } else {

                        dados.id = result.insertId;

                        // req.session.authorized = true;
                        // req.session.user = dados; // Quer que faça login depois

                        res.redirect("/");

                    }
                });
            }
        }
    });


}

module.exports.edit = (app, req, res) => {
    const id = req.params.id;

    if (req.session.user.id != id) {
        return res.status(403).redirect("/?message=-2");
    }

    const connection = app.config.dbConnection;
    const User = new app.app.models.user(null, connection);

    User.find(id, (err, result) => {
        if (err) {
            console.log({ message: "Algo deu errado durante uma query", err: err })
            res.redirect("/?message=-1");
        } else {
            res.render("edit", { user: result[0], auth: req.session.user });
        }
    });
}

module.exports.update = (app, req, res) => {
    const id = req.params.id

    if (req.session.user.id != id) {
        return res.status(403).redirect("/?message=-2");
    }

    let { confirm_password, ...dados } = req.body;                              // "dados" contem o valor de todos os inputs menos de "confirm_password"
    let error = {};

    if (dados.password && confirm_password) error = app.app.models.validator.validate(dados, confirm_password);
    else error = app.app.models.validator.validate(dados, confirm_password, false);

    const connection = app.config.dbConnection;
    const User = new app.app.models.user(dados, connection);

    if (Object.keys(error).length != 0) return res.status(403).json(error);
    confirm_password = undefined;

    User.checkEmail((err, result) => {
        if(err) {
            console.log({ message: "Algo deu errado durante uma query", err: err })
            res.status(500).json({ redirect: "/?message=-1" });
        } else {
            if(result.length > 0 && result[0].id != id) {
                res.status(400).json({email: "Email já cadastrado"});
            } else {
                User.update(id, (err, result) => {
                    if (err) {
                        console.log({ message: "Algo deu errado durante uma query", err: err })
                        res.status(500).json({ redirect: "/?message=-1" });
                    } else {
                        dados.id = req.session.user.id;
            
                        req.session.user = dados;
                        res.status(200).json({ redirect: "/?message=1" });
                    }
                });
            }
        }
    })
}

module.exports.destroy = (app, req, res) => {
    const id = req.params.id;

    if (req.session.user.id != id) {
        return res.status(403).json({ redirect: "/?message=-2" });
    }

    const connection = app.config.dbConnection;
    const User = new app.app.models.user(null, connection);

    User.destroy(id, (err, result) => {
        if (err) {
            console.log({ message: "Algo deu errado durante uma query", err: err })
            return res.status(500).json({ redirect: "/?message=-1" });
        } else {
            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).json({ redirect: "/?message=-3" });
                } else {
                    return res.status(200).json({ redirect: "/?message=2" });
                }
            });
        }
    });
}