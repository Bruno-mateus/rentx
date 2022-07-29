import AppError from '../../../../shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../../repositories/implementations/IUserRepository'
import { IUserTokensRepository } from '../../repositories/implementations/IUserTokensRepository'
import { v4 as uuid } from 'uuid'
import { IDateProvider } from '../../../../shared/provider/IDateProvider'
@injectable()
export class SendForogotPassWordUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) { }
  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) throw new AppError('user does not exists')

    const token = uuid()

    this.userTokensRepository.create(
      {
        user_id: user.id,
        refresh_token: uuid(),
        expires_date: this.dayjsDateProvider.addHour(3)
      }
    )
  }
}