import { Client, CommandInteraction, Interaction } from 'discord.js'

export interface ContextExecuteCommand {
    interaction: CommandInteraction,
    client: Client
}


export interface CommandContext {
    interaction: Interaction,
    client: Client,
    command: string
}