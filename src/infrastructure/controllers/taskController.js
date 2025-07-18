import { TaskRepository } from '../repositories/taskRepository.js';
import { TaskUseCases } from '../../application/usecases/taskUseCases.js';
import { taskSchema } from '../../domain/schemas/taskSchema.js';

const taskRepository = new TaskRepository();
const taskUseCases = new TaskUseCases(taskRepository);

export class TaskController {
  constructor(taskUseCases) {
    this.taskUseCases = taskUseCases;
  }


  async create(req, res) {
    try {
      const parsed = taskSchema.parse(req.body);
      const userId = req.user.userId;
      const result = await this.taskUseCases.createTask({ ...parsed, userId: userId });
      res.status(201).json(result);
    } catch (err) {
      if (err.name === 'ZodError') {
        return res.status(400).json({ error: err.errors.map(e => e.message).join(', ') });
      }
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const task = await this.taskUseCases.getTask(id);
      res.status(200).json(task);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }


  async list(req, res) {
    try {
      const userId = req.user.userId;
      const {title, completed} = req.query;
      const completedFilter = completed === undefined ? undefined : completed === 'true';

      const tasks = await this.taskUseCases.listTasks(userId, title, completedFilter);
      res.status(200).json(tasks);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const parsed = taskSchema.partial().parse(req.body);
      const userId = req.user.userId;

      const updated = await this.taskUseCases.updateTask(id, userId, parsed);
      res.status(200).json(updated);
    } catch (err) {
      if (err.name === 'ZodError') {
        return res.status(400).json({ error: err.errors.map(e => e.message).join(', ') });
      }
      res.status(500).json({ error: err.message });
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
