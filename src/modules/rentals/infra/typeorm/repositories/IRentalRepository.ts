import { Rental } from "../entities/Rental";

export interface IRentalRepository {
  findOpenRentalCar(car_id: string): Promise<Rental>
  findOpenrRentalUser(user_id: string): Promise<Rental>
}