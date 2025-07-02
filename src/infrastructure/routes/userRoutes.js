import express from 'express';
import { UserController } from '../controllers/userController.js';
import { UserUseCases } from '../../application/usecases/userUseCases.js';
import { UserRepository } from '../repositories/userRepository.js';

const router = express.Router();

const userRepository = new UserRepository();
const userUseCases = new UserUseCases(userRepository);
const userController = new UserController(userUseCases);

router.post('/signup', (req, res) => userController.signup(req, res));

export default router;
