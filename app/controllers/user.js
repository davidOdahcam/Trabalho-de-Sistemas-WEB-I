module.exports.index = (app, req, res) => {
    const messages = Object.freeze({
        "-1": "Algo deu errado durante a execução da query",
        "0": "Usuário adicionado com sucesso",
        "1": "Usuário atualizado com sucesso",
        "2": "Usuário deletado com sucesso"
    });
    
    if(req.query.message) {
        res.render("index", {message: messages[req.query.message]});
    } else {
        res.render("index");
    }
}

module.exports.search = (app, req, res) => {
    const name = req.body.name;

    const connection = app.config.dbConnection;
    const User = new app.app.models.user(null, connection);

    User.selectUsers(name, (err, result) => {
        if(err) {
            console.log({message: "Algo deu errado durante uma query", err: err})
            res.redirect("/?message=-1");
        } else {
            res.render("index", {users: result, search: true});
        }
    })
}

module.exports.create = (app, req, res) => {
    res.render("create");
}

module.exports.store = (app, req, res) => {
    let {confirm_password, ...dados} = req.body; // "dados" contem o valor de todos os inputs menos de "confirm_password"

    confirm_password = undefined;

    const connection = app.config.dbConnection;
    const User = new app.app.models.user(dados, connection);

    User.create((err, result) => {
        if(err) {
            console.log({message: "Algo deu errado durante uma query", err: err})
            res.redirect("/?message=-1");
        } else {
           req.session.authorized = true;
           req.session.user = dados;
        
           res.redirect("/?message=0");
        }
    })
}

module.exports.edit = (app, req, res) => {
    const id = req.params.id;
    const dados = req.body;
    
    const connection = app.config.dbConnection;
    const User = new app.app.models.user(dados, connection);

    User.find(id, (err, result) => {
        if(err) {
            console.log({message: "Algo deu errado durante uma query", err: err})
            res.redirect("/?message=-1");
        } else {
            res.render("edit");
        }
    });
}

module.exports.update = (app, req, res) => {
    const dados = req.body;
    const id = req.params.id

    const connection = app.config.dbConnection;
    const User = new app.app.models.user(dados, connection);

    User.update(id, (err, result) => {
        if(err) {
            console.log({message: "Algo deu errado durante uma query", err: err})
            res.redirect("/?message=-1");
        } else {
            res.redirect("/?message=1");
        }
    });
}

module.exports.destroy = (app, req, res) => {
    const id = req.params.id;

    const connection = app.config.dbConnection;
    const User = new app.app.models.user(null, connection);

    User.destroy(id, (err, result) => {
        if(err) {
            console.log({message: "Algo deu errado durante uma query", err: err})
            res.redirect("/?message=-1");
        } else {
            app.app.models.auth.logout(req, res);
        }
    });
}