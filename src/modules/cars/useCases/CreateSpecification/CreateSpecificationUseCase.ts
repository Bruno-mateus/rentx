import { inject, injectable } from 'tsyringe';
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository';

// sera recebido da requisição
interface IRequest {
  name: string;
  description: string;
}

@injectable()
export default class CreateSpecificationUseCase {

  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository) { }
  // quando uma funçao n vai retornar nada se usa o void

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists = await this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) throw new Error('Specification already exists');

    await this.specificationRepository.create({
      name,
      description,
    });
  }
}
