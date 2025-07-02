import jwt from 'jsonwebtoken';

const mockUser = {
  id: '123',
  username: 'admin',
  password: '123456' // apenas para fins didáticos
};

export class AuthController {
  login(req, res) {
    const { username, password } = req.body;

    if (username !== mockUser.username || password !== mockUser.password) {
      return res.status(401).json({ error: 'User inválido' });
    }

    const token = jwt.sign({ userId: mockUser.id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ token });
  }
}