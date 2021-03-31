module.exports = (app) => {
    app.get("/login", (req, res) => {
        app.app.controllers.auth.login(app, req, res);
    });

    app.post("/login", (req, res) => {
        app.app.controllers.auth.signup(app, req, res);
    });

    app.get("/logout", (req, res) => {
        app.app.controllers.auth.logout(app, req, res);
    });
}