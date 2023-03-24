import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { prisma } from './config';
import createUser from './factories/users-factory';

export async function cleanDb() {
  await prisma.hardSkills.deleteMany({});
  await prisma.softSkills.deleteMany({});
  await prisma.ability.deleteMany({});
  await prisma.class.deleteMany({});
  await prisma.proficiency.deleteMany({});
  await prisma.inventory.deleteMany({});
  await prisma.user.deleteMany({});
}

export async function generateToken(user?: User) {
  const incomingUser = user || await createUser();
  const token = jwt.sign({userId: incomingUser.id}, process.env.JWT_SECRET);

  return token;
}