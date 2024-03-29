
import { IUserTokenRepositoryDTO } from '../../dtos/IUserTokenRepositoryDTO'
import { UserTokens } from '../../infra/typeorm/entities/UserTokens'

export interface IUserTokensRepository {
  create({ user_id, expires_date, refresh_token }: IUserTokenRepositoryDTO): Promise<UserTokens>
  findByUserIdAndToken(user_id: string, refresh_token: string): Promise<UserTokens>
  deleteById(id: string): Promise<void>
  findByRefreshToken(refresh_token: string): Promise<UserTokens>
}