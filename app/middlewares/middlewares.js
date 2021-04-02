module.exports.auth = () => {
    return (req, res, next) => {
        if(!req.session.authorized) {
            if(req.url != "/cadastrar") {
                res.status(403).redirect("/login");
            } else next();
        } else if(req.url == "/cadastrar") {
            res.redirect("/?message=logged");
        } else next();
    }
}
