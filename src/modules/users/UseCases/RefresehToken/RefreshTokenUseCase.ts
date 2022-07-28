import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUserTokensRepository } from "../../repositories/implementations/IUserTokensRepository"
import { auth } from '../../../../config/auth'
import AppError from "../../../../shared/errors/AppError";
import { IDateProvider } from "../../../../shared/provider/IDateProvider";

interface IPayload {
  sub: string
  email: string
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) { }
  async execute(token: string): Promise<string> {
    //verify token
    const { sub, email } = verify(token, auth.secret_refresh_token) as IPayload

    const user_id = sub

    const userToken = await this.userTokensRepository.findByUserIdAndToken(user_id, token)

    if (!userToken) throw new AppError("Refresh token does not exist")

    await this.userTokensRepository.deleteById(userToken.id)

    const refresh_token = sign(
      { email },
      auth.secret_refresh_token,
      {
        subject: sub,
        expiresIn: auth.expires_refresh_token
      }
    )

    const expires_date = this.dateProvider.addDay(
      auth.expires_refresh_token_days
    )

    await this.userTokensRepository.create({
      user_id,
      expires_date,
      refresh_token
    })

    return refresh_token

  }
}