import bcrypt from 'bcrypt';
import { IUserRepository } from '../../domain/interfaces/IUserRepository.js';

export class UserUseCases {
  /**
   * @param {IUserRepository} userRepository
   */
  constructor(userRepository) {
    if (!(userRepository instanceof IUserRepository)) {
      throw new Error('userRepository must implement IUserRepository');
    }
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
