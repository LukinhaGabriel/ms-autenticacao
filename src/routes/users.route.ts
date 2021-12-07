import {  Router, Request, Response, NextFunction, response } from "express";

// get /users
// get /users/:uuid
// post /users/:uuid
// put /users/:uuid
// delete /users/:uuid

const userRouter = Router();

userRouter.get('/users', (req: Request, res: Response, next: NextFunction) => {
    const users = [{userName: 'Lucas'}];
    res.status(200).send(users);
});

userRouter.get('/users/:uuid', (req: Request<{uuid: string}>, res: Response, next: NextFunction) =>{
    const uuid = req.params.uuid;
    res.status(200).send({ uuid });
})
 
export default userRouter;