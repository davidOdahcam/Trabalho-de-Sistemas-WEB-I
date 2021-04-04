const { auth } = require("../middlewares/middlewares.js");

module.exports = (app) => {

    app.get("/", auth(), (req, res) => {
        app.app.controllers.user.index(app, req, res);
    });

    app.get("/cadastrar", auth(), (req, res) => {
        app.app.controllers.user.create(app, req, res);
    });

    app.post("/cadastrar", auth(), (req, res) => {
        app.app.controllers.user.store(app, req, res);
    });

    app.post("/buscar", auth(), (req, res) => {
        app.app.controllers.user.search(app, req, res);
    })

    app.get("/:id/editar", auth(), (req, res) => {
        app.app.controllers.user.edit(app, req, res);
    });
    
    app.put("/:id/editar", auth(), (req, res) => {
        app.app.controllers.user.update(app, req, res);
    }); 

    app.delete("/:id/deletar", auth(), (req, res) => {
        app.app.controllers.user.destroy(app, req, res);
    });
}