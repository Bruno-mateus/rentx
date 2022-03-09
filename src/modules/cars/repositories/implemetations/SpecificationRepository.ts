import Specification from '../../entities/Specification';
import { ISpecificationRepository, ISpecificationDTO } from '../ISpecificationRepository';

export default class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  create({ name, description }: ISpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      createdAt: new Date(),
    });

    this.specifications.push(specification);
  }
  findByName(name: string): Specification {
    // eslint-disable-next-line max-len
    const findSpecification = this.specifications.find((specification) => name === specification.name);
    return findSpecification;
  }
}
