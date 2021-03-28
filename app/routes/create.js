module.exports = (app) => {
    app.get("/cadastrar", (req, res) => {
        app.app.controllers.user.create(app, req, res);
    });
}