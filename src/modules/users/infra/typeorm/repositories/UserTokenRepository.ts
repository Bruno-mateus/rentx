import { getRepository, Repository } from 'typeorm';
import { IUserTokenRepositoryDTO } from '../../../dtos/IUserTokenRepositoryDTO';
import { IUserTokensRepository } from '../../../repositories/implementations/IUserTokensRepository'
import { UserTokens } from '../entities/UserTokens';

export class UserTokenRepository implements IUserTokensRepository {
  private repository: Repository<UserTokens>
  constructor() {
    this.repository = getRepository(UserTokens)

  }

  async findByUserIdAndToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    return await this.repository.findOne({ user_id, refresh_token })
  }
  async create({ user_id, expires_date, refresh_token }: IUserTokenRepositoryDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      user_id,
      expires_date,
      refresh_token
    })

    await this.repository.save(userToken)

    return userToken
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }

}