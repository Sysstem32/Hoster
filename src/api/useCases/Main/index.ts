import { MainController } from './MainControlle'
import { UserRepository } from '../../../data/repositories/user'

const mainController = new MainController(
    new UserRepository()
)

export { mainController }
