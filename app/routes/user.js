module.exports = (app) => {
    app.get("/cadastrar", (req, res) => {
        app.app.controllers.user.create(app, req, res);
    });

    app.get("/editar", (req, res) => {
        app.app.controllers.user.edit(app, req, res);
    });
    
    app.get("/entrar", (req, res) => {
        app.app.controllers.user.index(app, req, res);
    });
}