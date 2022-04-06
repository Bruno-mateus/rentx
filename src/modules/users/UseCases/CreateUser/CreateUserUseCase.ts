import { injectable, inject } from "tsyringe"
import { IUserRepository } from "../../repositories/IUserRepository"
import { hash } from "bcryptjs"
import IUserRepositoryDTO from "../../dtos/IUserRepositoryDTO"

@injectable()
class CreateUserUseCase {

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) { }

  async execute({
    username,
    password,
    email,
    driver_license,
    avatar,
  }: IUserRepositoryDTO): Promise<void> {

    const hashPassword = await hash(password, 8)

    const userAlreadyExists = this.userRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    await this.userRepository.create({
      username,
      password: hashPassword,
      email,
      driver_license,
      avatar: "avatar.png"
    })

  }
}


export { CreateUserUseCase }