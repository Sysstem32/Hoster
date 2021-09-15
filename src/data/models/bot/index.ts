import { Document, Schema, model } from 'mongoose'

export interface BotDocument extends Document {
    _id: string,
    ownerId: string
}

const BotSchema = new Schema({
    _id: String,
    ownerId: String
}, {
    timestamps: true
})

export const SavedBot = model<BotDocument>('Bot', BotSchema)
