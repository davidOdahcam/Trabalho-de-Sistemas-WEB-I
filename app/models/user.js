class User {
    constructor(user, connection = null) {
        this.user = user;
        this.connection = connection;
    }

    index(callback) {
        this.connection.query(`select * from users`, callback);
    }

    show(id, callback) {
        this.connection(`select * from users where id = ${id}`, callback);
    }

    create() {

    }

    store(callback) {
        this.connection.query(`insert into users set ?`, this.user, callback)
    }

    edit(id, callback) {
        this.connection.query(`select * from users where id = ${id}`, callback);
    }

    update(callback) {
        this.connection(`insert into users set ?`, this.user, callback);
    }

    destroy(id, callback) {
        this.connection.query(`delete from useres where ${id}`, callback);
    }
}

module.exports = () => User;