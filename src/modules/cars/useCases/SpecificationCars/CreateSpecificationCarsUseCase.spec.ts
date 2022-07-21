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

  it("should not be able to add a new specification to a now-existent car", async () => {
    const car_id = "1234";
    const specification_id = ["54321"];

    await expect(
      createSpecificationCarsUseCase.execute({
        car_id,
        specification_id,
      })
    ).rejects.toEqual(new AppError("Car does not exists!"));
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    const specification = await specificationRepositoryInMemory.create({
      description: "test",
      name: "test",
    });

    const specification_id = [specification.id];

    const specificationsCars = await createSpecificationCarsUseCase.execute({
      car_id: car.id,
      specification_id,
    });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
