import { DashboardController } from './DashboardController'
import { UserRepository } from '../../../data/repositories/user'

const dashboardController = new DashboardController(
    new UserRepository()
)

export { dashboardController }
