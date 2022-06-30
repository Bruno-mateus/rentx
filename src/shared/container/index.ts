import { container } from 'tsyringe';

import { CarsRepository } from '../../modules/cars/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/CategoriesRepository';
import SpecificationRepository from '../../modules/cars/infra/typeorm/repositories/SpecificationRepository';
import { ICarsRepository } from '../../modules/cars/repositories/ICarsRepository';
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository';
import { IUserRepository } from '../../modules/users/repositories/implementations/IUserRepository';
import { UserRepository } from '../../modules/users/infra/typeorm/repositories/UserRepository';
import { ICarsImageRepository } from '../../modules/cars/repositories/ICarsImageRepository';
import { CarImageRepository } from '../../modules/cars/infra/typeorm/repositories/CarImageRepository'


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

container.registerSingleton<ICarsImageRepository>(
  'CarsImageRepository',
  CarImageRepository
)
