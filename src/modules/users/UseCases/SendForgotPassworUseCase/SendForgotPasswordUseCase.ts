import AppError from '../../../../shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../../repositories/implementations/IUserRepository'
import { IUserTokensRepository } from '../../repositories/implementations/IUserTokensRepository'
import { v4 as uuid } from 'uuid'
import { IDateProvider } from '../../../../shared/provider/IDateProvider'
import { IMailProvider } from '../../../../shared/provider/emailProvider/IMailProvider'
import { resolve } from 'path'

@injectable()
export class SendForogotPassWordUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider,
    @inject("EtherealMalProvider")
    private mailProvider: IMailProvider
  ) { }
  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email)

    const templatePath = resolve(__dirname, '..', '..', 'views', 'emails', 'index.hbs')

    if (!user) throw new AppError('user does not exists')

    const token = uuid()

    await this.userTokensRepository.create(
      {
        user_id: user.id,
        refresh_token: uuid(),
        expires_date: this.dayjsDateProvider.addHour(3)
      }
    )

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`
    }

    await this.mailProvider.sendMail(
      email,
      'reset password',
      variables,
      templatePath
    )

  }
}