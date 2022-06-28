import { inject, injectable } from "tsyringe";
import { ICarsImageRepository } from '../../repositories/ICarsImageRepository'

interface IRequest {
  car_id: string,
  image_name: string[]
}

@injectable()
export class UploadImageCarUseCase {

  constructor(
    @inject("CarsImageRepository")
    private carImageRepository: ICarsImageRepository
  ) { }
  async execute({ car_id, image_name }: IRequest): Promise<void> {
    image_name.map(async image => {
      await this.carImageRepository.create(car_id, image);
    })
  }
}