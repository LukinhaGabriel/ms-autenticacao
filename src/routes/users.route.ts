import { Router, Request, Response, NextFunction, response } from "express";
import { StatusCodes } from 'http-status-codes';
import DatabaseError from "../models/errors/database.error.model";
import userRepository from "../repositories/user.repository";

// get /users
// get /users/:uuid
// post /users/:uuid
// put /users/:uuid
// delete /users/:uuid

const usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user = await userRepository.findAllUsers();
        //StatusCodes.OK == 200
        res.status(StatusCodes.OK).send(user);
    }catch(error){
        next(error);
    }
});

usersRoute.get('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try{
        const uuid = req.params.uuid;
        const user = await userRepository.findById(uuid);
        //StatusCodes.OK == 200
        res.status(StatusCodes.OK).send( user );
    } catch(error){
        next(error);
    }
});

usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const newUser = req.body;
        const uuid = await userRepository.create(newUser);
        //console.log(req.body);
        res.status(StatusCodes.CREATED).send(uuid);
    }catch(error){
        next(error);
    }
});

usersRoute.put('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try{   const uuid = req.params.uuid;
        const modifiedUser = req.body;
        
        modifiedUser.uuid = uuid;
        
        await userRepository.update(modifiedUser)

        res.status(StatusCodes.OK).send();
    }catch(error){
        next(error);
    }
});

usersRoute.delete('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try{   
        const uuid = req.params.uuid;
        await userRepository.remove(uuid)

        res.sendStatus(StatusCodes.OK);
    }catch(error){
        next(error);
    }
});

export default usersRoute;