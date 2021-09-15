import { UserRepository } from '../data/repositories/user'
import { BotRepository } from '../data/repositories/bot/bot'

export interface BotManagerContext {
    botId: string,
    userId: string
}

export class BotManager {
    constructor(
        private botRepository = new BotRepository(),
        private userRepository = new UserRepository()
    ) { }

    async handleCreate({ userId, botId }: BotManagerContext): Promise<void> {
        let savedBot = await this.botRepository
            .get({ id: botId, ownerId: userId })

        const savedUser = await this.userRepository
            .getOrCreate({ id: userId })

        if (savedBot) {
            throw new Error('O bot ja foi enviado.')
        }

        savedBot = await this.botRepository
            .create({ id: botId, ownerId: userId })

        savedUser.bots.push(botId)
        savedUser.markModified('bots')

        this.userRepository.save(savedUser)
    }

    async handleRemove({ userId, botId }: BotManagerContext): Promise<void> { 
        try {
            await this.isOwner({ userId, botId })
            const savedBot = await this.botRepository
                .get({ id: botId, ownerId: userId })

            const savedUser = await this.userRepository
                .get({ id: userId })

            if (savedBot) {
                await this.botRepository
                    .delete({ id: botId, ownerId: userId })
                
                const ind = savedUser.bots
                    .findIndex((id) => id === botId)
                
                savedUser.bots = savedUser.bots.splice(0, 1)
                savedUser.markModified('bots')

                this.userRepository.save(savedUser)
            } else {
                throw new Error('O bot não foi encontrado.')
            }
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async isOwner({ userId, botId }: BotManagerContext): Promise<void> {
        const savedBot = await this.botRepository
            .get({ id: botId, ownerId: userId })

        const savedUser = await this.userRepository
            .getOrCreate({ id: userId })

        if (!savedBot) {
            throw new Error('Bot não encontrado.')
        }

        if (
            !(savedBot.ownerId === userId) &&
            !savedUser.bots.includes(botId)
        ) {
            throw new Error('Apenas o dono do bot pode concluir essa ação.')
        }
    }

    async botExists({ userId, botId }: BotManagerContext): Promise<void> {
        const savedBot = await this.botRepository
            .get({ id: botId, ownerId: userId })
        
        if (!savedBot)
            throw new Error('O bot não existe.')
    }
}
