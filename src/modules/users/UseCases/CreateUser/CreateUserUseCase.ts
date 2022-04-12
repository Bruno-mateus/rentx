import { injectable, inject } from "tsyringe"
import { IUserRepository } from "../../repositories/IUserRepository"
import { hash } from "bcryptjs"
import IUserRepositoryDTO from "../../dtos/IUserRepositoryDTO"
import AppError from "../../../../errors/AppError"

@injectable()
class CreateUserUseCase {

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) { }

  async execute({
    name,
    password,
    email,
    driver_license,
    avatar,
  }: IUserRepositoryDTO): Promise<void> {

    const hashPassword = await hash(password, 8)

    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    await this.userRepository.create({
      name,
      password: hashPassword,
      email,
      driver_license,
      avatar
    })

  }
}


export { CreateUserUseCase }