import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import { IUserRepository } from '../../repositories/implementations/IUserRepository';
import { IUserTokensRepository } from '../../repositories/implementations/IUserTokensRepository';
import { auth } from '../../../../config/auth'
import { IDateProvider } from '../../../../shared/provider/IDateProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    email: string,
    name: string
  },
  token: string,
  refresh_token: string
}

@injectable()
export class AuthenticateUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {

    const {
      secret_token,
      expires_token,
      secret_refresh_token,
      expires_refresh_token,
      expires_refresh_token_days
    } = auth

    const user = await this.userRepository.findByEmail(email);
    // verify account
    if (!user) throw new AppError('Email or password is incorrect');

    // verfify password
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new AppError('Email or password is incorrect');

    // generate web token
    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_token,
    });

    const refresh_token = sign(
      { email },
      secret_refresh_token,
      {
        subject: user.id,
        expiresIn: expires_refresh_token
      }
    )
    const refresh_token_expires_date = this.dateProvider.addDay(
      expires_refresh_token_days
    )
    await this.userTokensRepository.create({
      user_id: user.id,
      expires_date: refresh_token_expires_date,
      refresh_token
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token
    };

    return tokenReturn;
  }
}
