import SpecificationRepository from '../../repositories/implemetations/SpecificationRepository';
import CreateSpecificationController from './CreateSpecificationController';
import CreateSpecificationUseCase from './CreateSpecificationUseCase';

const specificationRepository = null
const createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepository);
// eslint-disable-next-line max-len
export const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase);
