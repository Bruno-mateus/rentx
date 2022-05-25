import { Request, Response, NextFunction } from 'express'
import AppError from '../../../errors/AppError'
import { UserRepository } from '../../../../modules/users/repositories/implemetentios/UserRepository'

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  const { id } = req.user

  const userRepository = new UserRepository()
  const user = await userRepository.findById(id)

  if (!user.admin) throw new AppError("user isn't admin")

  return next()
}