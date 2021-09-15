import { CreateInstanceController } from './CreateInstanceController'
import { UserRepository } from '../../../data/repositories/user'
import { BotRepository } from '../../../data/repositories/bot/bot'

const createInstanceController = new CreateInstanceController(
    new UserRepository(),
    new BotRepository()
)

export { createInstanceController }
