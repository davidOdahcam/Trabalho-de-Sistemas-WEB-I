module.exports = (app) => {
    app.get("/entrar", (req, res) => {
        app.app.controllers.user.index(app, req, res);
    });
}