import { ICreateCarDTO } from '../../dtos/ICreateCarDTO';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../ICarsRepository';

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];
  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    id
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      id
    });

    this.cars.push(car);

    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async listAvailableCars(brand?: string, name?: string, category_id?: string): Promise<Car[]> {
    const cars = this.cars.filter((car) => {
      if (car.available === true && (
        // eslint-disable-next-line max-len
        (brand && car.brand === brand) || (name && car.name === name) || (category_id && car.category_id === category_id)
      )) {
        return car;
        // eslint-disable-next-line semi
      } return null
    });

    return cars;
  }
  async findById(id: string) {
    return this.cars.find((car) => car.id === id);
  }
}
