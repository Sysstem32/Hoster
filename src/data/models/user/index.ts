import { Document, Schema, model } from 'mongoose'

export interface UserDocument extends Document {
    _id: string,
    premium: Premium,
    bots: string[]
}

export enum PremiumType {
    free = "FREE_TYPE",
    carbon = "CARBON_TYPE"
}

export class Premium {
    type: PremiumType
    subscribeAt: string
    expiresAt: string
}

export class Settings {
    isAdmin: boolean = false
    isBeta: boolean = true
}

const UserSchema = new Schema({
    _id: String,
    premium: { type: Object, default: {} },
    bots: { type: Array, default: [] },
    settings: { type: Object, default: new Settings() }
}, {
    timestamps: true
})

export const SavedUser = model<UserDocument>('User', UserSchema)
