import {
    BotDocument,
    SavedBot
} from '../../models/bot/'

import { Wrapper } from '../../'
import { Snowflake } from '../../../entities/Snowflake'

export interface BotRepositoryContext {
    id: string,
    ownerId: string
}

export class BotRepository extends Wrapper<BotRepositoryContext, BotDocument> {
    async getOrCreate({ id, ownerId }: BotRepositoryContext) {
        const savedBot = await SavedBot.findById({ _id: id })

        return savedBot ?? (await this.create({ id, ownerId }))
    }

    async create({ id, ownerId}: BotRepositoryContext) {
        return new SavedBot({ _id: id, ownerId }).save()
    }

    async get({ id }: BotRepositoryContext) {
        return SavedBot.findById({ _id: id })
    }

    async delete({ id }: BotRepositoryContext) {
        return await SavedBot.findByIdAndDelete({ _id: id })
    }
}