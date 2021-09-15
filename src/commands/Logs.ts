import { ContextExecuteCommand } from '../interfaces/ICommand'
import { isValidId } from '../utils/ValidateId'
import { logs } from '../services/Manager'
import { createDefaultEmbed } from '../utils/CreateDefaultEmbed'
import { BotManager } from '../services/BotManager'

export default class LogsCommand {
    public config = {
        name: 'logs',
        description: 'Veja os logs do bot.',
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
        const manager = new BotManager()
        const id = interaction.options.getString('id')

        const embed = createDefaultEmbed(
            {
                username: interaction.user.username,
                avatarURL: interaction.user.avatarURL({ dynamic: true })
            }
        )
        
        embed.setDescription('Error\nPor favor, envie um id válido.')

        if (!isValidId(id)) return interaction.followUp({
            embeds: [ embed ]
        })

        try {
            await manager.botExists({
                botId: id,
                userId: interaction.user.id
            })

            const result = await logs({ id })

            await interaction.followUp({
                content: `\`\`\`js\n${result}\n\`\`\`\n`
            })
        } catch (err) {
            embed.setDescription(`**Error**\n${err.message}`)

            return await interaction.followUp({
                embeds: [ embed ]
            })
        }
    }
}