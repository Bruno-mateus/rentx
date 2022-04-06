import Specification from '../../entities/Specification';
import { ISpecificationRepository, ISpecificationDTO } from '../ISpecificationRepository';
import { getRepository, Repository } from 'typeorm';

export default class SpecificationRepository implements ISpecificationRepository {

  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification)
  }

  async create({ name, description }: ISpecificationDTO): Promise<void> {
    const specification = this.repository.create(
      {
        name,
        description
      }
      //create_at sera criado pelo próprio banco de dados
    );

    await this.repository.save(specification)
  }
  async findByName(name: string): Promise<Specification> {
    // eslint-disable-next-line max-len
    const findSpecification = await this.repository.findOne({ name });
    return findSpecification;
  }
}
