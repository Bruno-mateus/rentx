import { ISpecificationRepository } from '../../repositories/ISpecificationRepository';

// sera recebido da requisição
interface IRequest {
  name: string;
  description: string;
}

export default class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationRepository) { }
  // quando uma funçao n vai retornar nada se usa o void

  exec({ name, description }: IRequest): void {
    const specificationAlreadyExists = this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) throw new Error('Specification already exists');

    this.specificationRepository.create({
      name,
      description,
    });
  }
}
