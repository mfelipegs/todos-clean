import { PrismaClient } from '@prisma/client';
import { ITaskRepository } from '../../domain/interfaces/ITaskRepository.js';

const prisma = new PrismaClient();

export class TaskRepository extends ITaskRepository {
  async create(taskData) {
    if (!taskData.userId) {
      throw new Error('userId is required to create a task');
    }
    return await prisma.task.create({
      data: {
        title: taskData.title,
        completed: taskData.completed ?? false,
        userId: taskData.userId,
      },
    });
  }

  async getById(id) {
    return await prisma.task.findUnique({
      where: { id }
    });
  }

  async findAll(userId, titleFilter) {
    const whereClause = {
      userId,
      ...(titleFilter && {
        title: {
          contains: titleFilter,
          mode: 'insensitive', // opcional: ignora maiúsculas/minúsculas
        }
      })
    };

    return await prisma.task.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });
  }

  async update(id, data) {
    return await prisma.task.update({
      where: { id },
      data
    });
  }

  async delete(id) {
    return await prisma.task.delete({
      where: { id },
    });
  }
}
