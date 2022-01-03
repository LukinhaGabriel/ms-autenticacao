import { Router, Request, Response, NextFunction } from "express";
import JWT, { SignOptions } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/basic-authentication.middleware";
import ForbiddenError from "../models/errors/forbidden.error.model";
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";


const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {

    try{
      const user = req.user;

      if(!user){
        throw new ForbiddenError('Usuário não informado!');
      }

      const JwtPayload = { username: user.username };
      const jwtOptions: SignOptions = { subject: user?.uuid, expiresIn: '15m'};
      const secretKey = `${process.env.SECRET}`;

      const jwt = JWT.sign(JwtPayload, secretKey, jwtOptions);

      res.status(StatusCodes.OK).json({ token: jwt });

    } catch(error){
      next(error);
    }  
});

authorizationRoute.post('/token/validate', jwtAuthenticationMiddleware, (req: Request, res:Response, next:NextFunction) => {
  res.sendStatus(StatusCodes.OK)
})

export default authorizationRoute;