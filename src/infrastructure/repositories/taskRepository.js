import { PrismaClient } from '@prisma/client';
import { ITaskRepository } from '../../domain/interfaces/ITaskRepository.js';

const prisma = new PrismaClient();

export class TaskRepository extends ITaskRepository {
  async create(taskData) {
    return await prisma.task.create({
      data: {
        title: taskData.title,
        completed: taskData.completed ?? false,
        userId: taskData.userId,
      },
    });
  }


  async findAll(userId) {
    return await prisma.task.findMany({
      where: { userId }
    });
  }

  async delete(id) {
    return await prisma.task.delete({
      where: { id },
    });
  }
}
