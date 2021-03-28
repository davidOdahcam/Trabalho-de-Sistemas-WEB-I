module.exports = (app) => {
    app.get("/usuarios", (req, res) => {
        app.app.controllers.user.index(app, req, res);
    });
    
    // app.get("/teste", app.get('teste')(), (req, res) => {
    //     console.log("Teste");
    // })

    app.get("/usuarios/:id", (req, res) => {
        app.app.controllers.user.show(app, req, res);
    });

    app.get("/usuarios/cadastrar", (req, res) => {
        app.app.controllers.user.create(app, req, res);
    });

    app.post("/usuarios/cadastrar", (req, res) => {
        app.app.controllers.user.store(app, req, res);
    });

    app.get("/usuarios/:id/editar", (req, res) => {
        app.app.controllers.user.edit(app, req, res);
    });
    
    app.put("/usuarios/:id/editar", (req, res) => {
        app.app.controllers.user.update(app, req, res);
    }); 

    app.delete("/usuarios/:id/deletar", (req, res) => {
        app.app.controllers.user.destroy(app, req, res);
    });
}