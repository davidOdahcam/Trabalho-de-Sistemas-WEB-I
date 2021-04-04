require("dotenv").config();

const app = require("./config/server.js");
const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
})