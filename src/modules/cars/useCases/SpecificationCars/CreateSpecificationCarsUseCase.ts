import { inject, injectable } from 'tsyringe';
import AppError from '../../../../shared/errors/AppError';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../../repositories/ICarsRepository';
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository';

interface IRequest {
  car_id: string,
  specification_id: string[],
}
@injectable()
export class CreateSpecificationCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) { }

  async execute({ car_id, specification_id }: IRequest): Promise<Car> {
    const carExist = await this.carsRepository.findById(car_id);

    if (!carExist) {
      throw new AppError('Car does not exist');
    }
    const specifications = await this.specificationRepository.findByIds(specification_id)

    carExist.specifications = specifications

    return carExist
  }
}
