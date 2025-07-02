import express from 'express';
import dotenv from 'dotenv';
import taskRoutes from './infrastructure/routes/taskRoutes.js';
import authRoutes from './infrastructure/routes/authRoutes.js';
import userRoutes from './infrastructure/routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', userRoutes);
app.use('/login', authRoutes);
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
