import { container } from "tsyringe"

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository'
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository"
import { IUserRepository } from "../../modules/users/repositories/IUserRepository"
import SpecificationRepository from "../../modules/cars/repositories/implementations/SpecificationRepository"
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository"
import { UserRepository } from "../../modules/users/repositories/implemetentios/UserRepository"

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
)

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
)

container.registerSingleton<IUserRepository>(
  "UserRepository",
  UserRepository
)