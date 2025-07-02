import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
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
