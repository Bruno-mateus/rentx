import AppError from "../../../../shared/errors/AppError";
import { IDateProvider } from "../../../../shared/provider/IDateProvider";
import { inject, injectable } from "tsyringe";
import { IUserTokensRepository } from '../../repositories/implementations/IUserTokensRepository';
import { IUserRepository } from "../../repositories/implementations/IUserRepository";
import { hash } from "bcryptjs";
interface IRequest {
  token: string,
  password: string
}

@injectable()
export class ResetPasswordUserUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokenRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) { }
  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByRefreshToken(token)

    if (!userToken) throw new AppError('token invalid!!')

    //compare time
    if (this.dateProvider.compareIfBefore(
      userToken.expires_date,
      this.dateProvider.dateNow()
    )) {
      throw new AppError('Token expired')
    }

    const user = await this.userRepository.findById(userToken.user_id);
    user.password = await hash(password, 8)
    await this.userRepository.create(user)
    await this.userTokenRepository.deleteById(userToken.id)

  }
}