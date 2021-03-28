module.exports.index = (app, req, res) => {
    const connection = app.config.dbConnection;
    const User = new app.app.models.user(null, connection);

    User.selectAll((err, result) => {
        if(err) {
            console.log({message: "Algo deu errado durante uma query", err: err})
            res.render("index", {err: err})
        } else {
            res.render("index", {users: result});
        }
    })
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