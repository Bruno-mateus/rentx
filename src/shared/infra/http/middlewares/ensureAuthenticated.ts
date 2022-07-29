/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UserTokenRepository } from '../../../../modules/users/infra/typeorm/repositories/UserTokenRepository';
import { auth } from '../../../../config/auth';

import { UserRepository } from '../../../../modules/users/infra/typeorm/repositories/UserRepository';
import AppError from '../../../errors/AppError';

interface IPayload {
  sub: string
}

export default function ensureAutheticated(req: Request, res: Response, next: NextFunction) {
  // put token
  const authToken = req.headers.authorization; // return: Bearer 431SFD6576

  // validate if there is token
  if (!authToken) throw new AppError('Token missing');

  // ignore postion [0] and set [1] in a variable "token"
  const [, token] = authToken.split(' ');

  const userTokensRepository = new UserTokenRepository()

  // checks if the token is valid
  try {
    // token and hash md5 (created in useCase)                                   //output type strength
    const { sub: user_id } = verify(token, auth.secret_refresh_token) as IPayload;

    const userRepository = new UserRepository();
    // search match id
    const user = userTokensRepository.findByUserIdAndToken(user_id, token)

    // if user not exist
    if (!user) throw new AppError('User does not exists', 401);



    req.user = {
      id: user_id,
    };

    // if everything is ok, next
    next();
  } catch {
    throw new AppError('invalid token!');
  }
}
