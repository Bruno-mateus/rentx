import { Router } from 'express';
import { DevolutionRentalController } from '../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { CreateRentalController } from '../../../../modules/rentals/useCases/createRental/CreateRentalsController'
import ensureAutheticated from '../middlewares/ensureAuthenticated';
import { ListRentalByUserController } from '../../../../modules/rentals/useCases/listRentalByUser/ListRentalByUserController';


const rentalRoutes = Router()

const createRentalController = new CreateRentalController()
const createDevolutionController = new DevolutionRentalController()
const listRentalByUserController = new ListRentalByUserController()

rentalRoutes.post('/', ensureAutheticated, createRentalController.handle)
rentalRoutes.post('/devolution/:id', ensureAutheticated, createDevolutionController.handle)
rentalRoutes.get('/user', ensureAutheticated, listRentalByUserController.handle)

export { rentalRoutes }