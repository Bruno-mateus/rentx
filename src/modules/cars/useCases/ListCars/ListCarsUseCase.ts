import { inject, injectable } from 'tsyringe';

import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../../repositories/ICarsRepository';

interface IRequest {
  brand?: string,
  name?: string,
  category_id?: string
}
@injectable()
export class ListCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) { }
  async execute({ brand, name, category_id }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.listAvailableCars(
      brand,
      name,
      category_id,
    );

    return cars;
  }
}
