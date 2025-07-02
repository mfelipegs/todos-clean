import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../../domain/interfaces/IUserRepository.js';

const prisma = new PrismaClient();

export class UserRepository extends IUserRepository {
  async createUser({ username, password }) {
    return await prisma.user.create({
      data: {
        username,
        password
      }
    });
  }

  async findByUsername(username) {
    return await prisma.user.findUnique({
      where: { username }
    });
  }
}
