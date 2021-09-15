import { Request, Response } from 'express'
import { UserRepository } from '../../../data/repositories/user'
import { client } from '../../..'

export class DashboardController {
    constructor(
        private userRepository: UserRepository
    ) {}

    async handle(request: Request,  response: Response): Promise<any> {
        // const user = request.user as User
        // const savedUser = await this.userRepository
        //     .getOrCreate(user)

        const user = client.users.cache.get('557746795543789568')
        const savedUser = await this.userRepository
            .getOrCreate({ id: '557746795543789568' })

        return response.render('dashboard.ejs', {
            title: 'Dashboard',
            logged: true,
            bot: client,
            instance: {
                image: 'https://avatars.githubusercontent.com/u/89033277?s=200&v=4',
                name: 'Krowkaz'
            },
            savedUser,
            user
        })
    }
}