/* eslint-disable semi */
import { Request, Response, NextFunction } from 'express'

import { UserRepository } from '../../../../modules/users/infra/typeorm/repositories/UserRepository'
import AppError from '../../../errors/AppError'

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  const { id } = req.user
  console.log(id)
  const userRepository = new UserRepository()
  const user = await userRepository.findById(id)

  if (!user.admin) throw new AppError("user isn't admin")

  return next()
  // eslint-disable-next-line eol-last
}