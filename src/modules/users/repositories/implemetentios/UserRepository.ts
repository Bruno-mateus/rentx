import IUserRepositoryDTO from "../../dtos/IUserRepositoryDTO";
import { getRepository, Repository } from "typeorm";
import { IUserRepository } from "../IUserRepository";
import { User } from "../../entities/User"

class UserRepository implements IUserRepository {

  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }
  async findByEmail(email: string): Promise<User> {
    const findUserEmail = await this.repository.findOne({ email })
    return findUserEmail
  }
  async findById(id: string): Promise<User> {
    const findUserId = await this.repository.findOne({ id })
    return findUserId
  }

  async create({
    username,
    email,
    password,
    driver_license,
    avatar
  }: IUserRepositoryDTO): Promise<void> {
    const user = this.repository.create(
      {
        username,
        email,
        password,
        driver_license,
        avatar
      }
    )
    await this.repository.save(user)
  }

}

export { UserRepository }