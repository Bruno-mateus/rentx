import Specification from '../../infra/typeorm/entities/Specification';
import { ISpecificationDTO, ISpecificationRepository } from '../../repositories/ISpecificationRepository';

export class SpecificationInMemory implements ISpecificationRepository {

  specifications: Specification[] = []
  async create({ name, description }: ISpecificationDTO): Promise<Specification> {
    const specification = new Specification()
    Object.assign(specification, {
      name,
      description
    })
    this.specifications.push(specification)

    return specification
  }
  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(specification => specification.name === name)
    return specification
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter(specification => ids.includes(specification.id))

    return allSpecifications;
  }
}