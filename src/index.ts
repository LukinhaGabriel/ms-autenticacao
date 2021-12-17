require('dotenv').config(); //Lidando com dados sensiveis
import express from 'express';
import errorHandler from './middlewares/error-handler.middleware';
import mainRoute from './routes/main-routes';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';
import authorizationRoute from './routes/authorization.route';

const app = express();
const port = 3000;

//Configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configurações de Rotas
app.use(mainRoute);
app.use(statusRoute);
app.use(usersRoute);
app.use(authorizationRoute);

//Configuração dos Handlers de Erro
app.use(errorHandler);

//Inicialização do servidor
app.listen(port, () => {
    console.log(`'Aplicacao rodando no porta ${port}!`);
});

