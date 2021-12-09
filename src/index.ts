import express from 'express';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();
const port = 3000;

//Configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configurações de Rotas
app.use(statusRoute);
app.use(usersRoute);

//Inicialização do servidor
app.listen(port, () => {
    console.log(`'Aplicacao rodando no porta ${port}!`);
});

