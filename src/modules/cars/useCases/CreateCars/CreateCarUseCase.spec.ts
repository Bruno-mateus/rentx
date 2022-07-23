import AppError from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute(
      {
        name: 'Honda ',
        description: 'this is a new car',
        daily_rate: 10,
        license_plate: '1023-abg',
        fine_amount: 80,
        brand: 'Honda',
        category_id: 'sport',
      },
    );
    expect(car).toHaveProperty('id');
  });
  it('should not be able to create a new car with exists license plate', async () => {
    // espera um erro
    await createCarUseCase.execute(
      {
        name: 'car1',
        description: 'this is a car',
        daily_rate: 10,
        license_plate: '1023-avq',
        fine_amount: 80,
        brand: 'Honda',
        category_id: 'civic',
      },
    );
    await expect(async () => {
      await createCarUseCase.execute(
        {
          name: 'car2',
          description: 'this is a car',
          daily_rate: 10,
          license_plate: '1023-avq',
          fine_amount: 80,
          brand: 'Honda',
          category_id: 'civic',
        },
      )
    }
    ).rejects.toEqual(new AppError("Car already exist"));
  });

  it('Should not be able create a car with available true by default  ', async () => {
    const car = await createCarUseCase.execute(
      {
        name: 'Car available ',
        description: 'this is a new car',
        daily_rate: 10,
        license_plate: '1023-abg',
        fine_amount: 80,
        brand: 'Honda',
        category_id: 'sport',
      },
    );


    expect(car.available).toBe(true);
  });
});
