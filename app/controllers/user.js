module.exports.index = (app, req, res) => {
    const connection = app.config.dbConnection;
    const User = new app.models.user(null, connection);
    // console.log(connection()); return;

    User.selectAll((err, result) => {
        if(err) {
            console.log({message: "Algo deu errado durante uma query", err: err});
            res.writeHead(500, {"Content-Type": "application/json"});
            res.write(JSON.stringify({status: 500, error: "Algo deu errado durante uma query"}));
            res.end();
            //res.render("index", {err: err})
        } else {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(JSON.stringify({status: 200, users: result}));
            res.end();
            //res.render("index", {users: result});
        }
    })
}

module.exports.login = (app, req, res) => {
    res.render("login");
}

module.exports.logout = (app, req, res) => {
    res.end("logout");
}

module.exports.show = (app, req, res) => {
    const id = req.params.id;

    const connection = app.config.dbConnection;
    const User = new app.app.models.user(null, connection);

    User.selectOne(id, (err, result) => {
        if(err) {
            console.log({message: "Algo deu errado durante uma query", err: err})
            res.render("index", {err: err})
        } else {
            res.render("index", {users: result});
        }
    })
}

module.exports.create = (app, req, res) => {
    res.render("create");
}

module.exports.store = (app, req, res) => {
    let dados = req.body;

    const connection = app.config.dbConnection;
    const User = new app.app.models.user(dados, connection);

    User.create((err, result) => {
        if(err) {
            console.log({message: "Algo deu errado durante uma query", err: err})
            res.render("index", {err: err})
        } else {
            console.log("Usuário adicionado com sucesso");
            res.render("index", {message: "Usuário adicionado com sucesso"});
        }
    })
}

module.exports.edit = (app, req, res) => {
    const id = req.params.id;
    const dados = req.body;
    
    const connection = app.config.dbConnection;
    const User = new app.app.models.user(dados, connection);

    User.selectOne(id, (err, result) => {
        if(err) {
            console.log({message: "Algo deu errado durante uma query", err: err})
            res.render("index", {err: err})
        } else {
            console.log(result);
            res.render("edit", {message: "Usuário editado com sucesso"});
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
            res.render("index", {err: err})
        } else {
            console.log("Usuário editado com sucesso");
            res.render("index", {message: "Usuário editado com sucesso"});
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
            res.render("index", {err: err})
        } else {
            console.log("Usuário deletado com sucesso");
            res.render("index", {message: "Usuário deletado com sucesso"});
        }
    });
}