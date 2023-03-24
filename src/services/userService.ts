import bcrypt from 'bcrypt';
import userRepository from '@/repositories/userRepository';
import { LogInType, SignUpType } from '@/types/user-types';
import { incorrectCredentialsError } from '@/errors/user-errors';

async function createUser(props: SignUpType) {
  let {email, password, name} = props;
  const existingUser = await userRepository.findUserByEmail(email);
  
  if (existingUser) {
    throw {message: 'email already in use!'}
  }

  password = await bcrypt.hash(password, 10);
  const newUser = await userRepository.createUser({email, password, name});

  return newUser;
}

async function findUser(props: LogInType) {
  const {email, password} = props;
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw incorrectCredentialsError()
  }
  await checkIfPasswordsMatch(password, user.password);

  delete user.password
  return user;
}

async function checkIfPasswordsMatch(password: string, hashedPassword: string) {
  const matchingPassword = await bcrypt.compare(password, hashedPassword);

  if (!matchingPassword) throw incorrectCredentialsError();
}
const userService = {
  createUser,
  findUser
}

export default userService;