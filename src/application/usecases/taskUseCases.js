export class TaskUseCases {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async createTask(taskData) {
    // Validar dados básicos
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
