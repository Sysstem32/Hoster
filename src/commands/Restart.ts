import { ContextExecuteCommand } from '../interfaces/ICommand'
import { isValidId } from '../utils/ValidateId'
import { restart } from '../services/Manager'
import { createDefaultEmbed } from '../utils/CreateDefaultEmbed'
import { BotManager } from '../services/BotManager'

export default class RestartCommand {
    public config = {
        name: 'restart',
        description: 'Reinicie o seu bot.',
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

            const content = await restart({ id })
                ? 'Bot reiniciado com sucesso.'
                : 'Erro ao tentar reiniciar o bot.'

            embed.setDescription(content)

            await interaction.followUp({ embeds: [ embed ] })
        } catch (err) {
            embed.setDescription(`**Error**\n${err.message}`)

            return await interaction.followUp({
                embeds: [ embed ]
            })
        }
    }
}