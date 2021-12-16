import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const mainRoute = Router();

mainRoute.get('/',(req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK).send('<h1>Bem Vindo</h1>');

});

export default mainRoute;