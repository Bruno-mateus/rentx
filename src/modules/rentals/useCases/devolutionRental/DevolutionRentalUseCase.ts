import { inject, injectable } from "tsyringe"
import { IRentalRepository } from '../../infra/typeorm/repositories/IRentalRepository'
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository'
import { IDateProvider } from '../../../../shared/provider/IDateProvider'
import AppError from '../../../../shared/errors/AppError'
import { Rental } from "../../infra/typeorm/entities/Rental"


interface IRequest {
  id: string,
  user_id: string
}
@injectable()
export class DevolutionUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider

  ) { };

  async execute({ id, user_id }: IRequest): Promise<Rental> {

    const rental = await this.rentalsRepository.findById(id)
    const car = await this.carsRepository.findById(rental.car_id)

    const minimum_daily = 1;

    if (!rental) throw new AppError('Rental does not exists!!')

    //verify time rental
    const dateNow = this.dateProvider.dateNow()

    let daily = this.dateProvider.compareInDay(rental.start_date, dateNow)

    if (daily < 1) daily = minimum_daily

    //fine for late days
    const delay = this.dateProvider.compareInDay(dateNow, rental.start_date)

    let total = 0
    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount
      total = calculate_fine
    }

    total += daily * car.daily_rate;
    rental.end_date = this.dateProvider.dateNow()

    rental.total = total

    //update rental
    await this.rentalsRepository.create(rental)
    //update available car
    await this.carsRepository.updateAvailable(car.id, true)

    return rental
  }
}