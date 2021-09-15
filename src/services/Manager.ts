import { Snowflake } from '../entities/Snowflake'
import { execSync } from 'child_process'
import { mkdir, writeFile } from 'fs/promises'
import { createReadStream, existsSync, rmSync } from 'fs'
import { Extract } from 'unzipper'
import { download } from 'wget-improved'
import { Message } from 'discord.js'
import { createDefaultEmbed } from '../utils/CreateDefaultEmbed'

let path = `../temp`

let writeDockerFile = [
    'FROM node:alpine',
    'WORKDIR /usr/app',
    'COPY . .',
    'CMD [ "npm", "start" ]'
]

export async function createAndStart({ id }: Snowflake, settings, message?: Message): Promise<void> {  
    let steps = [
        `cd ${path} && yarn`,
        `&& docker build -t node ${path}`,
        `&& docker run --name bot_${id} -d node`
    ]

    try {
        const haveDir = existsSync(path)
        
        if (!haveDir) {
            await mkdir(path)
        }

        await writeFile(
            path + '/Dockerfile',
            writeDockerFile.join('\n')
        )
        
        const embed = createDefaultEmbed(
            {
                username: message.author.username,
                avatarURL: message.author.avatarURL({ dynamic: true })
            }
        )
        
        download(settings?.url, path + '/index.zip')
            .on('error', err => console.error(err))
            .on('start', fileSize => {
                embed.setDescription('Extraindo e instalando módulos.')
                
                message.edit({
                    embeds: [ embed ]
                })
            })
            .on('progress', progess => {})
            .on('end', output => {
                createReadStream(path + '/index.zip')
                    .pipe(Extract({ path }))

                setTimeout(async () => {
                    execSync(steps.join(' '))
                    
                    rmSync(path, { recursive: true })

                    embed.setDescription('Bot enviado com sucesso!')

                    message.edit({
                        embeds: [ embed ]
                    })
                }, 1000)
            })
    } catch (err) {
        return console.error(err)
    }
}

export async function update({ id }: Snowflake, { url }, message: Message): Promise<void> {
    let steps = [
        `docker rm -f bot_${id}`,
        `&& cd ${path} && yarn`,
        `&& docker build -t node ${path}`,
        `&& docker run --name bot_${id} -d node`
    ]

    const embed = createDefaultEmbed(
        {
            username: message.author.username,
            avatarURL: message.author.avatarURL({ dynamic: true })
        }
    )

    try {
        const haveDir = existsSync(path)
        
        if (!haveDir) {
            await mkdir(path)
        }

        await writeFile(
            path + '/Dockerfile',
            writeDockerFile.join('\n')
        )
        
        download(url, path + '/index.zip')
            .on('error', err => console.error(err))
            .on('start', fileSize => {
                embed.setDescription('Extraindo e instalando módulos.')
                
                message.edit({
                    embeds: [ embed ]
                })
            })
            .on('progress', progess => {})
            .on('end', output => {
                createReadStream(path + '/index.zip')
                    .pipe(Extract({ path }))

                setTimeout(async () => {
                    execSync(steps.join(' '))
                    
                    rmSync(path, { recursive: true })

                    embed.setDescription('Bot atualizado com sucesso!')

                    message.edit({
                        embeds: [ embed ]
                    })
                }, 1000)
            })
    } catch (err) {
        return console.error(err)
    }
}

export async function restart({ id }: Snowflake): Promise<boolean> {
    const logs = execSync(`docker restart bot_${id}`)
        .toString()

    return !(logs === `bot_${id}`)
}

export async function remove({ id }: Snowflake): Promise<boolean> {
    const logs = execSync(`docker rm -f bot_${id}`)
        .toString()

    return !(logs === `bot_${id}`)
}

export async function logs({ id }: Snowflake): Promise<string> {
    return execSync(`docker logs bot_${id}`).toString()
}
