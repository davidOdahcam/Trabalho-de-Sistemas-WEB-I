module.exports = (app) => {
    app.get("/editar", (req, res) => {
        app.app.controllers.user.edit(app, req, res);
    });
}