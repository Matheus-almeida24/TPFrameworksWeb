const express = require('express');
const cors = require('cors'); // Instale com: npm install cors
const mongoose = require('mongoose');

const app = express();

// 1. Configuração do CORS (Melhorada)
// Usar a biblioteca 'cors' é mais seguro e trata requisições tipo OPTIONS automaticamente
app.use(cors());

app.use(express.json());

// 2. Configuração da Porta
const PORT = process.env.PORT || 3000;

// 3. Conexão com o MongoDB (Ajustada para Variável de Ambiente)
// No Render, vamos criar uma variável chamada MONGODB_URI
const mongoURL = process.env.MONGODB_URI; 

if (!mongoURL) {
    console.error("ERRO: A variável MONGODB_URI não foi definida!");
}

mongoose.connect(mongoURL)
    .then(() => console.log('Database Connected'))
    .catch((error) => console.log('Erro ao conectar no banco:', error));

mongoose.Promise = global.Promise;

// 4. Rotas
const routes = require('./routes/routes');
app.use('/api', routes);

// 5. Início do Servidor
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});