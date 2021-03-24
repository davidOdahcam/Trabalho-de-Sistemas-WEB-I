const app = require("./config/server.js");
const PORT = process.env.PORT || 100;

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
})