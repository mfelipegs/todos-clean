import express from 'express';
import { TaskController } from '../controllers/taskController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
const taskController = new TaskController();

router.use(authMiddleware);

router.post('/', (req, res) => taskController.create(req, res));
router.get('/', (req, res) => taskController.list(req, res));
router.delete('/:id', (req, res) => taskController.delete(req, res));

export default router;
