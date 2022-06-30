import { Rental } from "../../entities/Rental";
import { IRentalRepository } from "../IRentalRepository";



export class RentalsRepositoryInMemory implements IRentalRepository {
  rentals: Rental[] = []
  async findOpenRentalCar(car_id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.car_id === car_id && rental.end_date === null)

  }
  findOpenrRentalUser(user_id: string): Promise<Rental> {
    throw new Error("Method not implemented.");
  }

}