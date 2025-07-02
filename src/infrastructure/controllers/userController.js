export class UserController {
  constructor(userUseCases) {
    this.userUseCases = userUseCases;
  }

  async signup(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username e senha são obrigatórios' });
    }

    try {
      const user = await this.userUseCases.signup({ username, password });
      res.status(201).json({ id: user.id, username: user.username });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}
