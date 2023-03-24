import { prisma } from '@/config';
import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

export default async function createUser(): Promise<User> {
  const hashPassword = await bcrypt.hash(faker.internet.password(), 10);

  return prisma.user.create({
    data: {
      email: faker.internet.email(),
      password: hashPassword,
      name: faker.name.firstName(),
      description: faker.lorem.paragraph(),
      level: faker.datatype.number(),
      xp: faker.datatype.number(),
      gold: faker.datatype.number()
    }
  })
}