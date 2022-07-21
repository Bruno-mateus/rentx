import AppError from '../../../../shared/errors/AppError';
import IUserRepositoryDTO from '../../dtos/IUserRepositoryDTO';
import { UserRepositoryInMemory } from '../../repositories/implementations/in-memory/UserRepositoryInMemory';
import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';
import { AuthenticateUseCase } from './AuthenticateUseCase';

let userRepositoryInMemory: UserRepositoryInMemory;
let authenticateUseCase: AuthenticateUseCase;
let createUserUseCase: CreateUserUseCase;

describe('User authentication', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUseCase = new AuthenticateUseCase(userRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to authenticate an user', async () => {
    const user: IUserRepositoryDTO = {
      name: 'Bruno',
      password: '12345',
      driver_license: '213213213',
      email: 'bruno_3205@hotmail.com',
    };
    // createUser
    await createUserUseCase.execute(user);
    // verify login
    const login = await authenticateUseCase.execute({
      email: user.email,
      password: user.password,
    });
    // expect a token in login
    expect(login).toHaveProperty('token');
  });
  it('Should not be able to authenticate a not existent user', async () => {
    const user: IUserRepositoryDTO = {
      name: 'Bruno',
      password: '12345',
      driver_license: '213213213',
      email: 'bruno_305@hotmail.com',
    };
    await createUserUseCase.execute(user);
    await expect(
      authenticateUseCase.execute({
        email: 'bruno_304@hotmail.com',
        password: '12345',
      })
    ).rejects.toEqual(new AppError('Email or password is incorrect'));
  });

  it('Should  not  able to authenticate with incorrect email or password', async () => {
    const user: IUserRepositoryDTO = {
      name: 'Bruno',
      password: '12345',
      driver_license: '213213213',
      email: 'bruno_305@hotmail.com',
    };
    // createUser
    await createUserUseCase.execute(user);

    await expect(
      // verify login
      authenticateUseCase.execute({
        email: 'bruno_305@hotmail.com',
        password: '1234',
      })
    ).rejects.toEqual(new AppError("Email or password is incorrect"))
  });
});
