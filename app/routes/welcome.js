module.exports = (app) => {
    app.get("/", (req, res) => {
        app.app.controllers.welcome.index(app, req, res);
    })
}