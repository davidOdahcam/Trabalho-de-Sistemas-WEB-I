module.exports = (app) => {
    app.get("/", (req, res) => {
        app.app.controllers.user.index(app, req, res);
    });
    
    // app.get("/teste", app.get('teste')(), (req, res) => {
    //     console.log("Teste");
    // })

    app.get("/cadastrar", (req, res) => {
        app.app.controllers.user.create(app, req, res);
    });

    app.post("/cadastrar", (req, res) => {
        app.app.controllers.user.store(app, req, res);
    });

    app.get("/:id/mostrar", (req, res) => {
        app.app.controllers.user.show(app, req, res);
    });

    app.get("/:id/editar", (req, res) => {
        app.app.controllers.user.edit(app, req, res);
    });
    
    app.put("/:id/editar", (req, res) => {
        app.app.controllers.user.update(app, req, res);
    }); 

    app.delete("/:id/deletar", (req, res) => {
        app.app.controllers.user.destroy(app, req, res);
    });
}