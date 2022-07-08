import dayjs from "dayjs"
import { DayjsDateProvider } from "../../../../shared/provider/dateProvider/implementations/DayjsDateProvider"
import AppError from "../../../../shared/errors/AppError"
import { RentalsRepositoryInMemory } from "../../infra/typeorm/repositories/in-memory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory"

let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let createRentalUseCase: CreateRentalUseCase
let dayjsDateProvider: DayjsDateProvider
let carsRepositoryInMemory: CarsRepositoryInMemory
describe('Create Rental', () => {
  //add 1 day for compare teste
  const dayAdd24Hours = dayjs().add(1, 'day').toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory;
    dayjsDateProvider = new DayjsDateProvider()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory)
  })
  it('should be able create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '12345',
      user_id: '12345',
      expected_return_date: dayAdd24Hours
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a new rental if there is another  open to the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '12344',
        user_id: '12345',
        expected_return_date: dayAdd24Hours
      })

      await createRentalUseCase.execute({
        car_id: '12345',
        user_id: '12345',
        expected_return_date: dayAdd24Hours
      })
    }).rejects.toBeInstanceOf(AppError)

  })
  it('should not be able to create a new rental if there is another  open to the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '12345',
        user_id: '12345',
        expected_return_date: dayAdd24Hours
      })

      await createRentalUseCase.execute({
        car_id: '12345',
        user_id: '1234',
        expected_return_date: dayAdd24Hours
      })
    }).rejects.toBeInstanceOf(AppError)

  })
  it('should not be able to create a new rental with invalid return date (less than 24 hours)', async () => {
    expect(
      async () => {
        await createRentalUseCase.execute({
          car_id: '12345',
          user_id: 'id_1230',
          expected_return_date: dayjs().toDate()
        })
      }).rejects.toBeInstanceOf(AppError)

  })
})