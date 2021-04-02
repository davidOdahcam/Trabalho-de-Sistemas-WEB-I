class User {
    constructor(user = null, connection) {
        this.user = user;
        this.connection = connection();
    }

    find(id, callback) {
        this.connection.query(`select * from users where id = ${id}`, callback);
    }

    selectUsers(name, callback) {
        this.connection.query(`select * from users where locate('${name}', users.name);`, callback);
    }

    create(callback) {
        this.connection.query(`insert into users set ?`, this.user, callback);
    }

    update(id, callback) {
        this.connection(`insert into users set ? where id = ${id}`, this.user, callback);
    }

    destroy(id, callback) {
        this.connection.query(`delete from users where id = ${id}`, callback);
    }
}

module.exports = () => User;