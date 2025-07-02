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

  async listTasks() {
    return this.taskRepository.findAll();
  }

  async deleteTask(id) {
    return this.taskRepository.delete(id);
  }
}
