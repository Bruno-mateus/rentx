import { getRepository, Repository } from 'typeorm';

import { ISpecificationRepository, ISpecificationDTO } from '../../../repositories/ISpecificationRepository';
import Specification from '../entities/Specification';

export default class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ISpecificationDTO): Promise<Specification> {
    const specification = this.repository.create(
      {
        name,
        description,
      },
      // create_at sera criado pelo próprio banco de dados
    );

    await this.repository.save(specification);

    return specification
  }
  async findByName(name: string): Promise<Specification> {
    // eslint-disable-next-line max-len
    const findSpecification = await this.repository.findOne({ name });
    return findSpecification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return await this.repository.findByIds(ids)
  }
}
