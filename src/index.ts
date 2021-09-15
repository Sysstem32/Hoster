import { Client, Intents } from 'discord.js'
import { Command } from './services/Command'
import { config } from 'dotenv'
import { databaseBotstrap } from './data'
import { UserRepository } from './data/repositories/user'
import { ClientRepository } from './data/repositories/client'
import { initializeServer } from './api/server'
config()

const command = new Command()
export const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.DIRECT_MESSAGES
    ],
    partials: [
        'CHANNEL',
        'GUILD_MEMBER',
        'MESSAGE',
        'USER'
    ]
})

client.on('ready', async() => {
    const clientRepository = new ClientRepository()
    
    const commands = client.guilds.cache.get('886706070993649765').commands
    
    await clientRepository.getOrCreate(client.user)
    await command.initialize()
    await initializeServer(3000)
    await commands.set(command.interactions)

    client.user.setActivity('Hosting Discord Bots.', {
        url: 'https://www.twitch.tv/sevenhosting',
        type: 'STREAMING'
    })

    console.log('Ready', client.user.username)
})

client.on('messageCreate', message => console.log(message.author.id))

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return
    
    const userRepository = new UserRepository()

    await userRepository.getOrCreate(interaction.user)
    await interaction.deferReply()
    await command.handler({
        interaction,
        command: interaction.commandName,
        client
    })
})

async function bootstrap() {
    try {
        await databaseBotstrap()
        await client.login(process.env.TOKEN)
    } catch (err) {
        return console.error(err.message)
    }
}

bootstrap()

//https://cdn.discordapp.com/attachments/886706200807342110/886770037107593256/index.zip