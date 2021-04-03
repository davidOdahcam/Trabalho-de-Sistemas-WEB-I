let mysql = require('mysql');

// let {DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE} = process.env;

let connMySQL = () => {
	console.log('Conexao com bd foi estabelecida');

	return mysql.createConnection({
		host : process.env.DB_HOST || 'localhost',
		user : process.env.DB_USERNAME || 'root',
		password : process.env.DB_PASSWORD || '1234',
		database : process.env.DB_DATABASE || 'web1'
	});
}

module.exports = () => {
	console.log('O autoload carregou o módulo de conexão com bd');
	return connMySQL;
}