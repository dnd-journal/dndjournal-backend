import { prisma } from '@/config';
import { LogInType, SignUpType } from '@/types/user-types';

async function createUser(props: SignUpType) {
  const {email, password, name} = props;
  return prisma.user.create({
    data: {
      email,
      password,
      name,
      description: '',
      level: 1,
      xp: 100,
      gold: 100
    }
  })
}

async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email
    }
  })
}

const userRepository = {
  createUser,
  findUserByEmail
}

export default userRepository;