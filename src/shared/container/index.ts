import { container } from 'tsyringe';

import { ICategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/ICategoriesRepository';
import { ISpecificationRepository } from '../../modules/cars/infra/typeorm/repositories/ISpecificationRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';
import SpecificationRepository from '../../modules/cars/repositories/implementations/SpecificationRepository';
import { IUserRepository } from '../../modules/users/infra/typeorm/repositories/IUserRepository';
import { UserRepository } from '../../modules/users/repositories/implemetentios/UserRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository,
);

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository,
);
