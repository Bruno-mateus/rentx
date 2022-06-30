import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { ListCarsUseCase } from './ListCarsUseCase';

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List all cars available', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able list all cars', async () => {
    const car = await carsRepositoryInMemory.create(
      {
        name: 'Audi V8',
        description: 'Carro de luxo',
        daily_rate: 140.00,
        license_plate: 'AMD-1417',
        fine_amount: 120.00,
        brand: 'Audi',
        category_id: 'car_id',
      },
    );
    const cars = await listCarsUseCase.execute({
      brand: 'Audi',
    });
    console.log(cars);

    expect(cars).toEqual([car]);
  });
  it('Should be able list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create(
      {
        name: 'Audi V8',
        description: 'Carro de luxo',
        daily_rate: 140.00,
        license_plate: 'AMD-1417',
        fine_amount: 120.00,
        brand: 'Audi',
        category_id: 'car_id',
      },
    );
    const cars = await listCarsUseCase.execute({ name: 'Audi V8' });
    console.log(cars);

    expect(cars).toEqual([car]);
  });
  it('Should be able list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create(
      {
        name: 'Audi V8',
        description: 'Carro de luxo',
        daily_rate: 140.00,
        license_plate: 'AMD-1417',
        fine_amount: 120.00,
        brand: 'Audi',
        category_id: '12345',
      },
    );
    const cars = await listCarsUseCase.execute({ category_id: '12345' });
    console.log(cars);

    expect(cars).toEqual([car]);
  });
});
