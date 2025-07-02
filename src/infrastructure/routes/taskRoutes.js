import express from 'express';
import { TaskController } from '../controllers/taskController.js';
import { TaskUseCases } from '../../application/usecases/taskUseCases.js';
import { TaskRepository } from '../repositories/taskRepository.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

const taskRepository = new TaskRepository();
const taskUseCases = new TaskUseCases(taskRepository);
const taskController = new TaskController(taskUseCases);

router.use(authMiddleware);

router.post('/', (req, res) => taskController.create(req, res));
router.get('/:id', (req, res) => taskController.getById(req, res));
router.get('/', (req, res) => taskController.list(req, res));
router.patch('/:id', (req, res) => taskController.update(req, res));
router.delete('/:id', (req, res) => taskController.delete(req, res));

export default router;
