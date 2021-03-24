let mysql = require('mysql');

let connMySQL = () => {
	console.log('Conexao com bd foi estabelecida');

	return mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '1234',
		database : 'web1'
	});
}

module.exports = () => {
	console.log('O autoload carregou o módulo de conexão com bd');
	return connMySQL;
}