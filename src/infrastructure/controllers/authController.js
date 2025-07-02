import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/userRepository.js';

export class AuthController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username e senha são obrigatórios' });
    }

    try {
      const user = await this.userRepository.findByUsername(username);

      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }
}
