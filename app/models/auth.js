class Auth {
    constructor(data, connection) {
        this.user = data;
        this.connection = connection();
    }

    login(callback) {
        this.connection.query(`select * from users where email = "${this.user.email}" AND password = "${this.user.password}"`, callback);
    }

    static logout(req, res) {
        req.session.destroy((err) => {
            if(err) {
                res.status(500).json({msg: "Erro no servidor", erro: err});
            } else {
                res.redirect("/?message=2");
            }
        });
    }
}

module.exports = () => Auth;