import express, { Request, Response, NextFunction } from 'express';
import userRouter from './routes/users.route';

const app = express();
const port = 3000;

app.use(userRouter);

app.get('/status', (req: Request, res: Response, next: NextFunction) =>{
    res.status(200).send({foo:'Success!'});
});


app.listen(port, () => {
    console.log(`'Aplicacao rodando no porta ${port}!`);
});

