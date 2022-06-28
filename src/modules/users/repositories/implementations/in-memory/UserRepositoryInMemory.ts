import IUserRepositoryDTO from '../../../dtos/IUserRepositoryDTO';
import { User } from '../../../infra/typeorm/entities/User';
import { IUserRepository } from '../../../repositories/implementations/IUserRepository';

export class UserRepositoryInMemory implements IUserRepository {
  users: User[] = [];
  async create(data: IUserRepositoryDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name: data.name,
      driver_license: data.driver_license,
      email: data.email,
      password: data.password,
    });
    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }
  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
}
