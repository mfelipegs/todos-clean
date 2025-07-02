import { TaskRepository } from '../repositories/taskRepository.js';
import { TaskUseCases } from '../../application/usecases/taskUseCases.js';

const taskRepository = new TaskRepository();
const taskUseCases = new TaskUseCases(taskRepository);

export class TaskController {
  constructor(taskUseCases) {
    this.taskUseCases = taskUseCases;
  }


  async create(req, res) {
    try {
      const taskData = {
        title: req.body.title,
        userId: req.user.userId
      };
      const task = await this.taskUseCases.createTask(taskData);
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async list(req, res) {
    try {
      const tasks = await this.taskUseCases.listTasks(req.user.userId);
      res.json(tasks);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await taskUseCases.deleteTask(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
