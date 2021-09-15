import { MessageCollector } from 'discord.js'
import { ContextExecuteCommand } from '../interfaces/ICommand'
import { isValidId } from '../utils/ValidateId'
import { update } from '../services/Manager'
import { createDefaultEmbed } from '../utils/CreateDefaultEmbed'
import { BotManager } from '../services/BotManager'

export default class UpdateCommand {
    public config = {
        name: 'update',
        description: 'Atualize o seu bot.',
        options: [
            {
                name: 'id',
                description: 'Id do bot.',
                type: 'STRING',
                required: true
            }
        ]
    }

    async execute({ interaction }: ContextExecuteCommand) {
        const botManager = new BotManager()
        const channel = interaction.channel
        const id = interaction.options.getString('id')

        const embed = createDefaultEmbed(
            {
                username: interaction.user.username,
                avatarURL: interaction.user.avatarURL({ dynamic: true })
            }
        )
        
        embed.setDescription('**Error**\nPor favor, envie um id válido.')

        if (!isValidId(id)) return interaction.followUp({
            embeds: [ embed ]
        })

        try {
            await botManager.isOwner({
                botId: id,
                userId: interaction.user.id
            })

            embed.setDescription('Envie o arquivo zipado do bot.')
        
            await interaction.followUp({
                embeds: [ embed ]
            })
        } catch (err) {
            embed.setDescription(`**Error**\n${err.message}`)

            return await interaction.followUp({
                embeds: [ embed ]
            })
        }

        const collector = new MessageCollector(channel, {
            filter: (i) => i.author.id === interaction.user.id,
            max: 1
        })

        collector.on('collect', async collected => {
            const { url } = collected.attachments.first()

            embed.setDescription('Preparando.')

            try {
                await update(
                    { id },
                    { url },
                    await interaction.channel.send({
                        embeds: [ embed ]
                    })
                )
            } catch (err) {
                throw new Error(err.message)
            }
        })
    }
}