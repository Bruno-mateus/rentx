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

    return await this.repository.findOne({
      where: { car_id, end_date: null }
    });

  }
  async findOpenrRentalUser(user_id: string): Promise<Rental> {
    return await this.repository.findOne({
      where: { user_id, end_date: null }
    })
  }
  async create({
    user_id,
    car_id,
    expected_return_date,
    id,
    end_date,
    total
  }: IRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      user_id,
      car_id,
      expected_return_date,
      id,
      end_date,
      total
    })
    await this.repository.save(rental)
    return rental
  }

  async findById(id: string): Promise<Rental> {
    return await this.repository.findOne(id)
  }

}