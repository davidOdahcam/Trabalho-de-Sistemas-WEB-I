function CPF(cpf) {
    if (typeof (cpf == "number")) cpf = cpf.toString();
    if (cpf.length > 11) {
        cpf = cpf.replace("-", "");
        cpf = cpf.split(".").join("");
    }
    if (cpf.length > 11 || cpf.length < 11) return false;
    let resultDigit = 0;
    for (let i = 10; i > 1; i--) {
        resultDigit += cpf[10 - i] * i;
    }
    resultDigit = resultDigit % 11 == 0 || resultDigit % 11 == 1 ? 0 : 11 - resultDigit % 11;
    if (resultDigit != cpf[9]) return false;
    resultDigit = 0;
    for (let i = 11; i > 1; i--) {
        resultDigit += cpf[11 - i] * i;
    }
    resultDigit = resultDigit % 11 == 0 || resultDigit % 11 == 1 ? 0 : 11 - resultDigit % 11;
    if (resultDigit != cpf[10]) return false;
    return true;
}
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
    const regexName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let error = {};
    if (dados.name == "") error.name = "Nome obrigatório";
    else if (dados.name.length < 3 || regexName.test(dados.name) == false) error.name = "Nome inválido";

    if (dados.cpf == "") error.cpf = "CPF obrigatório";
    else if (CPF(dados.cpf) == false) error.cpf = "CPF inválido";

    if (dados.email == "") error.email = "Email obrigatório";
    else if((regexEmail.test(dados.email) == false)) error.email = "Email inválido";

    if (dados.password == "") error.password = "Senha obrigatória";
    else if(dados.password.length < 5 || dados.password.length > 255) error.password = "Senha inválida";

    if (confirm_password == "" && dados.password != confirm_password) error.confirm_password = "É obrigatório confirmar senha";
    else if(dados.password != confirm_password) error.confirm_password = "Senhas diferentes";

    if( Object.keys(error).length != 0) return res.render("create", { error });
    confirm_password = undefined;

    const connection = app.config.dbConnection;
    const User = new app.app.models.user(dados, connection);

    User.create((err, result) => {


        if (err) {
            console.log({ message: "Algo deu errado durante uma query", err: err })
            res.redirect("/?message=-1");
        } else {
            dados.id = result.insertId;

            req.session.authorized = true;
            req.session.user = dados;

            res.redirect("/?message=0");
        }
    })
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

    let { confirm_password, ...dados } = req.body; // "dados" contem o valor de todos os inputs menos de "confirm_password"

    confirm_password = undefined;

    const connection = app.config.dbConnection;
    const User = new app.app.models.user(dados, connection);

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