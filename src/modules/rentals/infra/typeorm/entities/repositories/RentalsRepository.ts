import { getRepository, Repository } from "typeorm";
import { IRentalDTO } from "../../../../dtos/IRentalDTO";
import { CreateRentalUseCase } from "../../../../useCases/createRental/CreateRentalUseCase";
import { IRentalRepository } from "../../repositories/IRentalRepository";
import { Rental } from "../Rental";

export class RentalsRepository implements IRentalRepository {
  private repository: Repository<Rental>
  constructor() {
    this.repository = getRepository(Rental)
  }
  async findOpenRentalCar(car_id: string): Promise<Rental> {

    return await this.repository.findOne({ car_id });

  }
  async findOpenrRentalUser(user_id: string): Promise<Rental> {
    return await this.repository.findOne({ user_id })
  }
  async create(data: IRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data)
    await this.repository.save(rental)
    return rental
  }

}