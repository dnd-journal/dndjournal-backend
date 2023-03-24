import userService from '@/services/userService';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

async function signUp(req: Request, res: Response) {
  const { email, password, name } = req.body;

  try {
    const user = await userService.createUser({email, password, name})
    res.status(httpStatus.OK).send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(httpStatus.CONFLICT)
  }
}

async function logIn(req: Request, res: Response) {
  const {email, password} = req.body;

  try {
    const user = await userService.findUser({email, password});
    res.status(httpStatus.OK).send(user);
  } catch (error) {
    console.log(error);
    if (error.name === 'incorrect_credentials'){
      return res.status(httpStatus.UNAUTHORIZED).send(error)
    }
    res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export {
  signUp,
  logIn
}