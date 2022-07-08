import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '../../../dtos/ICreateCarDTO';
import { ICarsRepository } from '../../../repositories/ICarsRepository';
import { Car } from '../entities/Car';

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async findById(car_id: string): Promise<Car> {
    return await this.repository.findOne(car_id)
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(data);

    await this.repository.save(car);

    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const carFindByLicensePlate = await this.repository.findOne({ license_plate });

    return carFindByLicensePlate;
  }
  async listAvailableCars(brand?: string, name?: string, category_id?: string) {
    const carsQuery = this.repository.createQueryBuilder('car').where('available = :available', { available: true });
    if (brand) {
      carsQuery.andWhere('car.brand = :brand', { brand });
    }

    if (name) {
      carsQuery.andWhere('car.name = :name', { name });
    }

    if (category_id) {
      carsQuery.andWhere('car.category_id = :category_id', { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }
  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository.createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute()
  }

}
