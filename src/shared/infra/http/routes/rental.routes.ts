import { Router } from 'express';
import { DevolutionRentalController } from '../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { CreateRentalController } from '../../../../modules/rentals/useCases/createRental/CreateRentalsController'
import ensureAutheticated from '../middlewares/ensureAuthenticated';


const rentalRoutes = Router()

const createRentalController = new CreateRentalController()
const createDevolutionController = new DevolutionRentalController()

rentalRoutes.post('/', ensureAutheticated, createRentalController.handle)
rentalRoutes.post('/devolution/:id', ensureAutheticated, createDevolutionController.handle)


export { rentalRoutes }