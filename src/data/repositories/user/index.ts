import {
    UserDocument,
    Premium,
    SavedUser
} from '../../models/user/'

import { Wrapper } from '../../'
import { Snowflake } from '../../../entities/Snowflake'

export class UserRepository extends Wrapper<Snowflake, UserDocument> {
    async getOrCreate({ id }: Snowflake) {
        const savedUser = await SavedUser.findById({ _id: id })

        return savedUser ?? (await this.create({ id }))
    }

    async create({ id }: Snowflake) {
        return new SavedUser({ _id: id }).save()
    }

    async get({ id }: Snowflake) {
        return SavedUser.findById({ _id: id })
    }

    async delete({ id }: Snowflake) {
        return await SavedUser.findByIdAndDelete({ _id: id })
    }
}