import { logIn, signUp } from '@/controllers';
import { Router } from 'express';

const userRouter = Router();

userRouter
.post('/sign-up', signUp)
.post('/log-in', logIn)

export {userRouter};