module.exports.login = (app, req, res) => {
    console.log(res)
    // res.render("login");
    res.write("20");
    res.end();
}

module.exports.signup = (app, req, res) => {
    res.end("signup");
}

module.exports.logout = (app, req, res) => {
    res.end("logout");
}