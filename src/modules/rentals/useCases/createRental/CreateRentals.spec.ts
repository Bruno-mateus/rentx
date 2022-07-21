import dayjs from "dayjs"
import { DayjsDateProvider } from "../../../../shared/provider/dateProvider/implementations/DayjsDateProvider"
import AppError from "../../../../shared/errors/AppError"
import { RentalsRepositoryInMemory } from "../../infra/typeorm/repositories/in-memory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory"
import { IRentalRepository } from "../../infra/typeorm/repositories/IRentalRepository"

let rentalsRepositoryInMemory: IRentalRepository
let createRentalUseCase: CreateRentalUseCase
let dayjsDateProvider: DayjsDateProvider
let carsRepositoryInMemory: CarsRepositoryInMemory
describe('Create Rental', () => {
  //add 1 day for compare teste
  const dayAdd24Hours = dayjs().add(1, 'day').toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory)
  })
  it('should be able create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'test',
      description: 'description test',
      daily_rate: 100,
      license_plate: "abc-1212",
      fine_amount: 50,
      brand: "brand",
      category_id: "1234"
    })

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '12345',
      expected_return_date: dayAdd24Hours
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a new rental if there is another  open to the same user', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '12344',
      user_id: '12345',
      expected_return_date: dayAdd24Hours
    })
    await expect(
      createRentalUseCase.execute({
        car_id: '12344',
        user_id: '321',
        expected_return_date: dayAdd24Hours
      })
    ).rejects.toEqual(new AppError("Car is unavailable"))

  })

  it('should not be able to create a new rental with invalid return date (less than 24 hours)', async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: '12345',
        user_id: 'id_1230',
        expected_return_date: dayjs().toDate()
      })
    ).rejects.toEqual(new AppError("Invalid return time"))

  })
})