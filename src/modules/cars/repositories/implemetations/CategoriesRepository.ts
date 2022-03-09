import { Category } from '../../entities/Category';
import { ICreateCategoryDTO, ICategoriesRepository } from '../ICategoriesRepository';
import { getRepository, Repository } from 'typeorm'

class CategoriesRepository implements ICategoriesRepository {

  private repository: Repository<Category>



  constructor() {
    this.repository = getRepository(Category)
  }


  // criador da categoria                                   /promise sem retorno
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({ //criando categoria
      name,
      description
      //create_at sera criado pelo próprio banco de dados
    });

    await this.repository.save(category) //salvando a categoria no repositorio

  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find()
    return categories
  }

  async findByName(name: string): Promise<Category> {
    //select * from catgories where name = name limit   1
    const findCategory = await this.repository.findOne({ name })
    return findCategory;
  }
}

export { CategoriesRepository };
