import { inject, injectable } from "tsyringe"
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalRepository } from "../../infra/typeorm/repositories/IRentalRepository";

@injectable()
export class ListRentalByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalRepository
  ) { }
  async execute(user_id: string): Promise<Rental[]> {
    const rentalByUser = this.rentalsRepository.findByUser(user_id)

    return rentalByUser
  }
}