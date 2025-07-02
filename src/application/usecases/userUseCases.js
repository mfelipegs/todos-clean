import bcrypt from 'bcrypt';

export class UserUseCases {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async signup({ username, password }) {
    const existing = await this.userRepository.findByUsername(username);
    if (existing) throw new Error('Usuário já existe');

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.userRepository.createUser({
      username,
      password: hashedPassword
    });
  }
}
