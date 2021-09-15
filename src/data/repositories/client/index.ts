import {
    ClientDocument,
    Bots,
    SavedClient
} from '../../models/client/'

import { Wrapper } from '../../'
import { Snowflake } from '../../../entities/Snowflake'

export class ClientRepository extends Wrapper<Snowflake, ClientDocument> {
    async getOrCreate({ id }: Snowflake) {
        const savedUser = await SavedClient.findById({ _id: id })

        return savedUser ?? (await this.create({ id }))
    }

    async create({ id }: Snowflake) {
        return new SavedClient({ _id: id }).save()
    }

    async get({ id }: Snowflake) {
        return SavedClient.findById({ _id: id })
    }

    async delete({ id }: Snowflake) {
        return await SavedClient.findByIdAndDelete({ _id: id })
    }
}