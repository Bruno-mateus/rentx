import IUserRepositoryDTO from "../dtos/IUserRepositoryDTO"
import { User } from "../entities/User";

interface IUserRepository {
  create(data: IUserRepositoryDTO): Promise<void>
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUserRepository }

