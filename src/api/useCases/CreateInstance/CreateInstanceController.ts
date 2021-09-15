import { Request, Response } from 'express'
import { UserRepository } from '../../../data/repositories/user'
import { BotRepository } from '../../../data/repositories/bot/bot'
import { UploadedFile } from 'express-fileupload'
import { BotManager } from '../../../services/BotManager'
import { client } from '../../..'

export class CreateInstanceController {
    constructor(
        private userRepository: UserRepository,
        private botRepository: BotRepository,
        private botManager: BotManager
    ) {}

    async handle(request: Request,  response: Response): Promise<any> {
        const user = client.users.cache
            .get('557746795543789568')

        try {

            return response.status(200).send()
        } catch(err) {
            console.error(err)

            return response.status(500).json(JSON.stringify(err)).send()
        }
    }
}