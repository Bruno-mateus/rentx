import AppError from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationInMemory } from '../../repositories/in-memory/SpecificationInMemory';
import { CreateSpecificationCarsUseCase } from './CreateSpecificationCarsUseCase';

let createSpecificationCarsUseCase: CreateSpecificationCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationInMemory;
describe('create specification ', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationInMemory()
    createSpecificationCarsUseCase = new CreateSpecificationCarsUseCase(carsRepositoryInMemory, specificationRepositoryInMemory);
  });

  it('should be able toa add a new specification to a does not exist car', async () => {
    const car_id = '123';
    const specification_id = ['54321'];
    await expect(
      createSpecificationCarsUseCase.execute({
        car_id,
        specification_id
      })
    ).rejects.toEqual(new AppError('Car does not exists!'));
  });
  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Honda ',
      description: 'this is a new car',
      daily_rate: 10,
      license_plate: '1023-abg',
      fine_amount: 80,
      brand: 'Honda',
      category_id: 'sport',
    });
    const specification = await specificationRepositoryInMemory.create({
      name: 'test',
      description: 'test'
    })
    const specification_id = [specification.id];
    const specificationCars = await createSpecificationCarsUseCase.execute({ car_id: car.id, specification_id });
    expect(specificationCars).toHaveProperty('specifications')
    expect(specificationCars.specifications.length).toBe(1)
  });
});
