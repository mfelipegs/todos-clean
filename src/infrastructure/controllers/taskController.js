import { TaskRepository } from '../repositories/taskRepository.js';
import { TaskUseCases } from '../../application/usecases/taskUseCases.js';

const taskRepository = new TaskRepository();
const taskUseCases = new TaskUseCases(taskRepository);

export class TaskController {
  async create(req, res) {
    try {
      const task = await taskUseCases.createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async list(req, res) {
    try {
      const tasks = await taskUseCases.listTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
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
