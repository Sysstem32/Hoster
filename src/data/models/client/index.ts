import { Document, Schema, model } from 'mongoose'

export interface ClientDocument extends Document {
    _id: string,
    bots: string
}

export class Bots {
    free: number = 5
    carbon: number = 10
}

const ClientSchema = new Schema({
    _id: String,
    bots: { type: Object, default: new Bots() }
}, {
    timestamps: true
})

export const SavedClient = model<ClientDocument>('Client', ClientSchema)
