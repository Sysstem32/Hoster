import { connect, Document } from 'mongoose'

export async function databaseBotstrap() {
    return connect(process.env.DATABASE_URI)
        .then(() => console.log('[DATABASE] Ready for hooks'))
        .catch(err => console.error(`[DATABASE] Error: ${err.message}`))
}

export abstract class Wrapper<T1, T2 extends Document> {
    protected abstract get(type: T1): Promise<T2 | undefined>
    protected abstract getOrCreate(type: T1): Promise<T2>
    protected abstract create(type: T1): Promise<T2>
    protected abstract delete(type: T1): Promise<T2>

    save(savedType: T2) {
        return savedType.save()
    }
}