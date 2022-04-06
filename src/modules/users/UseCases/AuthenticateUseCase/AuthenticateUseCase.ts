import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUserRepository } from "../../repositories/IUserRepository"

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    email: string,
    username: string
  },
  token: string
}

@injectable()
export class AuthenticateUseCase {

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {

    const user = await this.userRepository.findByEmail(email)
    //verify account
    if (!user) throw new Error("Email or password is incorrect");

    //verfify password
    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) throw new Error("Email or password is incorrect")


    //generate web token
    const token = sign({}, "5b0e01be99a81e2ce09078ec74433890", {
      subject: user.id,
      expiresIn: "1d"
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        username: user.username,
        email: user.email
      }
    }

    return tokenReturn

  }


}