import { Rental } from "../entities/Rental";
import { IRentalDTO } from '../../../dtos/IRentalDTO'

export interface IRentalRepository {
  findOpenRentalCar(car_id: string): Promise<Rental>
  findOpenrRentalUser(user_id: string): Promise<Rental>
  create(data: IRentalDTO): Promise<Rental>
  findById(id: string): Promise<Rental>
  findByUser(user_id: string): Promise<Rental[]>
}