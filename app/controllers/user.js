module.exports.index = (app, req, res) => {
    if(req.query.message) {
        res.render("index", {message: req.query.message});
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
            res.render("index", {err: err})
        } else {
           // console.log(result);
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

    // IMPLEMENTAR: PASSAR PELO MIDDLEWARE DE AUTENTICAÇAO

    User.create((err, result) => {
        if(err) {
            console.log({message: "Algo deu errado durante uma query", err: err})
            res.render("index", {err: err})
        } else {
          //  console.log("Usuário adicionado com sucesso");
           //console.log(result)
          // 
          
           req.session.authorized = true;
           req.session.user = dados;
        
           res.render("index", {message: "Usuário adicionado com sucesso"});
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
            res.render("index", {err: err})
        } else {
           // console.log(result);
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
         //   console.log("Usuário editado com sucesso");
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
         //   console.log("Usuário deletado com sucesso");
            res.render("index", {message: "Usuário deletado com sucesso"});
        }
    });
}