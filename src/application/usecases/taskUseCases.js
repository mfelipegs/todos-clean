import { ITaskRepository } from '../../domain/interfaces/ITaskRepository.js';

export class TaskUseCases {
  /**
   * @param {ITaskRepository} taskRepository
   */
  constructor(taskRepository) {
    if (!(taskRepository instanceof ITaskRepository)) {
      throw new Error('taskRepository must implement ITaskRepository');
    }

    this.taskRepository = taskRepository;
  }

  async createTask(taskData) {
    if (!taskData.title) {
      throw new Error('Title is required');
    }
    return this.taskRepository.create(taskData);
  }

  async getTask(id) {
    const task = await this.taskRepository.getById(id);
    if (!task) throw new Error('Task not found');
    return task;
  }

  async listTasks(userId, titleFilter, completedFilter) {
    return this.taskRepository.findAll(userId, titleFilter, completedFilter);
  }

  async updateTask(id, userId, updateData) {
    const existing = await this.taskRepository.getById(id);
    if (!existing || existing.userId !== userId) {
      throw new Error('Task not found or unauthorized');
    }

    return await this.taskRepository.update(id, updateData);
  }

  async deleteTask(id) {
    return this.taskRepository.delete(id);
  }
}
