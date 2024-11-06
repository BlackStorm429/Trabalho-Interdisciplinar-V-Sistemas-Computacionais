const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const User = require('./models/User'); 

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuração do Sequelize
const sequelize = new Sequelize('smartlockdb', 'postgres', 'senha1234', {
  host: 'localhost',
  dialect: 'postgres',
});

// Testa a conexão
sequelize.authenticate()
  .then(() => {
    console.log('Conexão ao banco de dados PostgreSQL estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao PostgreSQL:', err);
  });

// Rota de cadastro
app.post('/cadastrar', async (req, res) => {
  const { name, email, password, doorPassword } = req.body;

  // Lógica de cadastro
  if (!name || !email || !password || !doorPassword) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const user = await User.create({ name, email, password, doorPassword });
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário, verifique os dados.' });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
