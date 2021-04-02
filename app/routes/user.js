const middlewares = require("../middlewares/middlewares.js");

module.exports = (app) => {

    app.get("/", middlewares.auth(), (req, res) => {
        app.app.controllers.user.index(app, req, res);
    });

    app.get("/cadastrar", (req, res) => {
        app.app.controllers.user.create(app, req, res);
    });

    app.post("/cadastrar", (req, res) => {
        app.app.controllers.user.store(app, req, res);
    });

    app.post("/buscar", (req, res) => {
        app.app.controllers.user.search(app, req, res);
    })

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