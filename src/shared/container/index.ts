import { CarsRepository } from '../../modules/cars/infra/typeorm/repositories/CarsRepository';
import { ICarsRepository } from '../../modules/cars/repositories/ICarsRepository';
import { container } from 'tsyringe';

import { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/CategoriesRepository';
import SpecificationRepository from '../../modules/cars/infra/typeorm/repositories/SpecificationRepository';
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository';
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
container.registerSingleton<ICarsRepository>(
  'CarsRepository',
  CarsRepository,
);
