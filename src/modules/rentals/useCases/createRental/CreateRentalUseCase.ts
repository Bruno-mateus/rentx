import AppError from "../../../../shared/errors/AppError"
import { Rental } from "../../infra/typeorm/entities/Rental"
import { IRentalRepository } from "../../infra/typeorm/repositories/IRentalRepository"
import { DayjsDateProvider } from '../../../../shared/provider/dateProvider/implementations/DayjsDateProvider'
import { inject, injectable } from "tsyringe"

interface IRequest {
  car_id: string,
  user_id: string,
  expected_return_date: Date
}
@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalRepository: IRentalRepository,
    @inject('DayjsDateProvider')
    private dayjsDateProvider: DayjsDateProvider
  ) { }
  async execute({ car_id, user_id, expected_return_date }: IRequest): Promise<Rental> {

    const carUnavailable = await this.rentalRepository.findOpenRentalCar(car_id)
    if (carUnavailable) throw new AppError('Car is unavailable')

    const rentalOpenToUser = await this.rentalRepository.findOpenrRentalUser(user_id)
    if (rentalOpenToUser) throw new AppError("There's a rental in progress for user!")

    //The rental must have a minimum duration of 24 hours
    //current date
    const dateNow = this.dayjsDateProvider.dateNow()
    //compare difference between dates in time format
    const compare = this.dayjsDateProvider.compareInHours(dateNow, expected_return_date)

    if (compare < 24) throw new AppError('minimum allowable rental date is 24 hours')

    const rental = this.rentalRepository.create({ car_id, user_id, expected_return_date })
    return rental
  }

}