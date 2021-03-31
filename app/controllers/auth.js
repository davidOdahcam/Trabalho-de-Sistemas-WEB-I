module.exports.login = (app, req, res) => {
    res.render("login");
}

module.exports.signup = (app, req, res) => {
    res.end("signup");
}

module.exports.logout = (app, req, res) => {
    res.end("logout");
}