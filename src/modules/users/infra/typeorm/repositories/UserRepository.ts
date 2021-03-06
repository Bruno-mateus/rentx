
import { getRepository, Repository } from 'typeorm';

import IUserRepositoryDTO from '../../../dtos/IUserRepositoryDTO';
import { IUserRepository } from '../../../repositories/implementations/IUserRepository';
import { User } from '../entities/User';

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async findByEmail(email: string): Promise<User> {
    const findUserEmail = await this.repository.findOne({ email });
    return findUserEmail;
  }
  async findById(id: string): Promise<User> {
    const findUserId = await this.repository.findOne({ id });
    return findUserId;
  }

  async create({
    name,
    email,
    password,
    driver_license,
    avatar,
    id,
  }: IUserRepositoryDTO): Promise<void> {
    const user = this.repository.create(
      {
        name,
        email,
        password,
        driver_license,
        avatar,
        id,
      },
    );
    await this.repository.save(user);
  }
}

export { UserRepository };
