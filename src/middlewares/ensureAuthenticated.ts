import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { UserRepository } from "../modules/users/repositories/implemetentios/UserRepository";

import AppError from '../errors/AppError'

interface IPayload {
  sub: string
}


export default function ensureAutheticated(req: Request, res: Response, next: NextFunction) {

  //put token
  const authToken = req.headers.authorization; //return: Bearer 431SFD6576

  //validate if there is token
  if (!authToken) throw new AppError("Token missing")

  //ignore postion [0] and set [1] in a variable "token"
  const [, token] = authToken.split(" ")

  //checks if the token is valid
  try {
    //token and hash md5 (created in useCase)                                   //output type strength
    const { sub: user_id } = verify(token, "5b0e01be99a81e2ce09078ec74433890") as IPayload

    const userRepository = new UserRepository()
    //search match id
    const user = userRepository.findById(user_id)

    //if user not exist 
    if (!user) throw new AppError("User does not exists", 401)

    console.log(user_id)

    req.user = {
      id: user_id
    }

    //if everything is ok, next
    next()
  } catch {
    throw new AppError("invalid token!")
  }
}
