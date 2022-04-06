import { parse } from 'csv-parse';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

// formato de array que receberei

interface IImportCategories {
  name: string;
  description: string;
}
@injectable()
export default class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository) { }
  // a promise retornara um array de categories
  loadCategories(file: Express.Multer.File): Promise<IImportCategories[]> {
    return new Promise((resolve, reject) => {
      // cria arquivo de leitura em stream   //pega o caminho de onde esta o file
      const stream = fs.createReadStream(file.path);

      // recebendo array do tipo de categorias
      const categories: IImportCategories[] = [];
      // leitor csv
      const parseFile = parse();

      // pega o arquivo criado ae joga para o leitor de csv
      stream.pipe(parseFile);
      // lende o arquivo csv
      parseFile.on('data', async (line) => {
        const [description, name] = line;

        categories.push({
          name,
          description,
        });
      }) // espera finalizar para prosseguir
        .on('end', () => {
          // removendo arquivo temporario da pasta tmp
          fs.promises.unlink(file.path);
          // depois coloque dentro da Promise
          resolve(categories);
        })
        // se der erro
        .on('error', (err) => {
          // joga o erro dentro do reject
          reject(err);
        });
    });
  }
  // por mais que n tenha nenhum retorno quando se usa async await é ncessario definir a Promise
  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { description, name } = category;

      const existCategory = await this.categoriesRepository.findByName(name);



      if (!existCategory) {
        await this.categoriesRepository.create({
          name,
          description,
        });
      }

      if (existCategory) throw new Error("Category already exists")
    });


  }
}
