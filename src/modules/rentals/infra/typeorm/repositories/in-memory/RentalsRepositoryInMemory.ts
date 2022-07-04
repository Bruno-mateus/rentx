import { IRentalDTO } from "../../../../dtos/IRentalDTO";
import { Rental } from "../../entities/Rental";
import { IRentalRepository } from "../IRentalRepository";



export class RentalsRepositoryInMemory implements IRentalRepository {
  rentals: Rental[] = []
  //  a car that is alredy rented will not be rented again
  async findOpenRentalCar(car_id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date)

  }
  //a user active rental cannot rent another car
  async findOpenrRentalUser(user_id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date)
  }
  async create({ car_id, user_id, expected_return_date }: IRentalDTO) {
    const rental = new Rental()
    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date()
    })

    this.rentals.push(rental)
    return rental
  }
}