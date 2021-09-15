import { MessageEmbed } from 'discord.js'

export function createDefaultEmbed({ username, avatarURL }) {
    return new MessageEmbed({
        author: { name: username, iconURL: avatarURL },
        footer: { text: 'Seven Box - Host' },
        thumbnail: { url: 'https://i.ibb.co/cy6FLgN/images.png' },
        color: 0xcecece
    })
}