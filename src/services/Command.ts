import { readdir } from 'fs/promises'
import { CommandContext } from '../interfaces/ICommand'

export class Command {
    constructor(
    ) { }

    private commands = new Map<string, any>()
    public interactions = new Array<any>()

    async initialize(): Promise<void> {
        const props = await readdir('./src/commands')

        for (const handlers of props) {
            const { default: Handler } = await import(`../commands/${handlers}`)
            const handler = new Handler()

            this.commands.set(
                handler.config.name.toLowerCase(),
                handler
            )

            this.interactions.push({ ...handler.config })

            console.log('[LOADING] Command: ' + handler.config.name)
        }
    }

    async handler({ interaction, client, command }: CommandContext): Promise<void> {
        const target = this.commands.get(command)

        try {
            target.execute({
                interaction,
                client
            })
        } catch (err) {
            throw new Error(err.message)
        }
    }
}
